import findIndex from 'lodash/findIndex'
import matches from 'lodash/matches'
import isMatchWith from 'lodash/isMatchWith'
import isEmpty from 'lodash/isEmpty'
import isPlainObject from 'lodash/isPlainObject'

const Assertion = chai.Assertion

Assertion.overwriteMethod('matchPartialsUnordered', function (_super) {
  return function (collectionOfPartials) {
    return matchPartials({ collectionOfPartials, ordered: false, me: this })
  }
})

Assertion.overwriteMethod('matchPartialsOrdered', function (_super) {
  return function (collectionOfPartials) {
    return matchPartials({ collectionOfPartials, ordered: true, me: this })
  }
})

// Just like matching nested partials, but if the elements are not objects but rather
// arrays. Eg:
//
// expect(
//  [['thing1', {id: 1, email: 'thing1@example.com'}], ['thing2', {id: 2, email: 'thing2@example.com'}]]
// ).to.matchNestedPartialsUnordered(
//  [['thing1', {id: 1}], ['thing2', {id: 2}]]
// )
//
Assertion.overwriteMethod('matchNestedPartialsUnordered', function (_super) {
  return function (collectionOfPartials) {
    return matchPartials({
      collectionOfPartials,
      ordered: false,
      nested: true,
      nestedOrdered: false,
      me: this,
    })
  }
})

// A collection of partial objects is matched against a collection of full
// objects to verify that:
// 1) The collections are the same length
// 2) Every element in the partials collection matches an element in the
//    full collection
//
//  Once an element in the full collection is matched against, it is removed from
//  the copy of the collection and cannot be matched again.
//
//  The validation does not check to see if a given element in the partial collection
//  matches *more than 1* element in the full collection.
function matchPartials({
  collectionOfPartials,
  collectionOfFulls,
  ordered,
  // Allow/expect nested arrays of arrays type stuff
  nested,
  // Allow those to be unordered. Actually unordered is not yet implemented...
  nestedOrdered,
  me,
}) {
  collectionOfFulls ??= [...me._obj]
  collectionOfPartials = [...collectionOfPartials]

  new Assertion(collectionOfFulls).to.have.length(collectionOfPartials.length)

  while (collectionOfPartials.length) {
    const partial = collectionOfPartials.pop()
    const matchingIndex = findIndex(
      ordered
        ? [collectionOfFulls[collectionOfFulls.length - 1]]
        : collectionOfFulls,
      (full) => {
        if (Array.isArray(partial) && nested) {
          if (!Array.isArray(full) || full.length !== partial.length) {
            return false
          }
          const partials = partial
          const fulls = full
          for (let i = 0; i < partials.length; i++) {
            const partial = partials[i]
            const full = fulls[i]
            const wasMatch = partialCheck(full, partial, partialBackup)
            if (wasMatch === false) {
              return false
            }
          }

          return true
        }

        const wasMatch = partialCheck(full, partial, partialBackup)
        if (wasMatch === false) {
          return false
        }
        return true
      }
    )

    if (matchingIndex === -1) {
      me.assert(
        false,
        // normal assertion
        'expected #{this} to include #{exp}',
        // negative assertion
        'expected #{this} to not include #{exp}',
        partial, // expected
        collectionOfFulls // actual
      )
    }

    collectionOfFulls.splice(
      ordered ? collectionOfFulls.length - 1 : matchingIndex,
      1
    )
  }
}

// A partial object is matched against a full object to verify
// that everything in the partial exists in the full object.
Assertion.overwriteMethod('matchPartial', function (_super) {
  return function (partialObject) {
    const fullObject = this._obj

    // Lodash's `isMatch` states that:
    //    Partial comparisons will match empty array and empty object source values against any array
    //    or object value, respectively.
    //
    // Which isn't what we want, so I've re-implemented things a bit in order to get
    // more desirable behavior where [] will only match another [], same with {} vs {}
    const matched = isMatchWith(fullObject, partialObject, partialCheck)

    if (!matched) {
      this.assert(
        false,
        // normal assertion
        'expected #{this} to partially match #{exp}',
        // negative assertion
        'expected #{this} to not partially match #{exp}',
        partialObject, // expected
        fullObject // actual
      )
    }
  }
})

function partialCheck(fullSide, partialSide, backupFn) {
  if (Array.isArray(partialSide)) {
    new Assertion(fullSide).to.matchPartialsUnordered(partialSide)
    return true
  }
  if (isPlainObject(partialSide)) {
    if (isEmpty(partialSide)) {
      return isPlainObject(fullSide) && isEmpty(fullSide)
    }
  } else if (partialSide === fullSide) {
    return true
  }
  if (typeof backupFn === 'function') {
    return backupFn(fullSide, partialSide)
  }
  // For some methods, (like isMatchWith) returning undefined will fall back to
  // default isMatch behavior
}

function partialBackup(fullSide, partialSide) {
  return matches(partialSide)(fullSide)
}
