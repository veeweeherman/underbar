(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n===0) {return []}
    return n === undefined ? array[array.length-1] : array.slice(-n)
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  //MY PSEUDO CODE--DO THIS MORE FKN OFTEN EVEN IF U THINK U KNOW THIS SHIT!
    //use if statement to check whether collection is either array or object;
    //use for loop to invoke the iterator/callback on each item in collection, for each respective type of collection

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection)
      };
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection)
      }
    }    
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  //MY PSEUDO CODE--DO THIS MORE FKN OFTEN EVEN IF U THINK U KNOW THIS SHIT!
  //use each to iterate through the array, use if statement to check if current item matches the target, if so return the index #
  //if no match, return -1
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
//MY PSEUDO CODE--DO THIS MORE FKN OFTEN EVEN IF U THINK U KNOW THIS SHIT!
  //create an empty array to push the pass-test items into
  //use each to iterate each item in collection, if the item passes then push into the empty array
  //make sure to return the array
  _.filter = function(collection, test) {
    var passedElements = [];
    _.each(collection, function(item) {
      if (test(item)) {
        passedElements.push(item)
      }
    })
    return passedElements;
  };

  // Return all elements of an array that don't pass a truth test.
  //MY PSEUDO CODE--DO THIS MORE FKN OFTEN EVEN IF U THINK U KNOW THIS SHIT!
  //the opposite of filter! Make an array of FAILURES buahaha
  //use filter, says the instructions.... return the filter to collect passed items and get it out into the next scope (bc filter is a nested function)
  //return the opposite-operator (!) on the result

  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item) {
      return !test(item)
    });
  };

  // Produce a duplicate-free version of the array.
//MY PSEUDO CODE--DO THIS MORE FKN OFTEN EVEN IF U THINK U KNOW THIS SHIT!
  
  //this has lots of notes and with the example array and callback, ive outlined each stage what each array/object will be; sorry it's flooded with all my pseudocode

  //return the values of the keys
  //return unique values frmo unsorted array
  //handle iterators that work with a sorted array
  //return a new array, not modify the old one

 
  //var numbers = [1, 2, 1, 3, 1, 4] // var add1 = function(num) {return num+1}
  //_.uniq(numbers) --> [1, 2, 3, 4]
_.uniq = function(array, isSorted, iterator) {
  var uniqueObj = {}; //create empty object
  if (!iterator) { //iterator is empty variable when no arg is passed
    iterator = _.identity //giving default function value for iterator
  }
  _.each(array, function(v, i, l) {
    uniqueObj[iterator(v)] = v //is the same as uniqueObj[v]=v bc its like there's always gonna be an iterator function, no matter whether iterator was passed in or not
    //invokes callback to each value in the array and make it the key name to the (no longer) empty object) and its value is the value itself
    //its good to use objects bc with every repeated value in the array, its corresponding key-value pair will be overwritten w the exact same value when it iterates over a duplicate
  }) //-->{2:1, 3:2, 2:1, 4:3, 2:1, 5:4}-->{2:1, 3:2, 4:3, 5:4}
  var uniqueArr = Object.keys(uniqueObj) //make a new array of all the uniqueObj's key names --> [2, 3, 4, 5]
  uniqueArr.sort(); //sort the array -->[2, 3, 4, 5]
  return _.map(uniqueArr, function(v,i,l) { //use map for this array to pull out 
    return uniqueObj[v] //--> [uniqueObj[2], uniqueObj[3], uniqueObj[4], uniqueObj[5]]===[1, 2, 3, 4]
  })
}; 



  // Return the results of applying an iterator to each element.
  //MY PSEUDO CODE--DO THIS MORE FKN OFTEN EVEN IF U THINK U KNOW THIS SHIT!
  //create an empty for the iterated items
  //use each to invoke the iterator on the items in the collection and push the iterated items into the empty array
  //outside the each function (meaning, after) return the no-longer empty array of iterated items
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
        var mappedItems = [];
    _.each(collection, function(item) {
      mappedItems.push(iterator(item));
    })
    return mappedItems;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  //MY PSEUDO CODE--DO THIS MORE FKN OFTEN EVEN IF U THINK U KNOW THIS SHIT!
  //takes 3 arguments: collection, callback, starting value/initial/accumulator (optional)
  //callback function takes 4 arguments: previous value/initial value, current value, current index, and the array
  //if no accumulator, the first element of array/object (array[0]) is the accumulator: accumulator = array[0] or object[key], then iterator is called on second and onward items
  //if there is an accumulator, it is the start value and every iterated item gets added to it via each
  //retry
  //use if to check if accumulator has been passed; if accumulator has nt been passed, accumulator needs to be assigned a value, specifically the first element of the array
  //use each to iterate through the collection and it will re-assign the accumulator value after each iteration
  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined) { //if no accumulator arg passsed
        accumulator = collection.shift(); //assign the first elem of collection as accumulator
      } 
      _.each(collection, function(item) { //so in this scenario there's always an accumulator
          accumulator = iterator(accumulator, item);
      })
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.

  //MY PSEUDO CODE--DO THIS MORE FKN OFTEN EVEN IF U THINK U KNOW THIS SHIT!
  //_.every returns true if all values in list that pass predicate test; so the callback/iterator is the callback

  //reduce will "sum" all the boolean values down to one value of true or false, only IF ALL VALUES IN THE ARRAY MATCH TRUE/FALSE; like the BOUNCER EXAMPLE
      /* bouncer example:
      var over21 = _.reduce(bouncersNightmare, function(accumulated, current) {
        if (accumulated && current >= 21){
          return true
        } else {
          return false
        }
      }, true)
      */
  //sample: var nums=[1,2,3,4,5]
  //var isEven = function(num) {return num % 2 === 0}

  //make epmpty newArray to hold values of true's and false's as each item in collection is invoked by callback
  //use reduce on newArray to check if all values are true or false
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    if (!iterator) {
      iterator = _.identity;
    } //assigns a function to iterator function, so there's always technically a callback, even if the user doesn't pass in an iterator function argument

    return _.reduce(collection, function(list,item) {
        if( !iterator(item) ) { //if current item is false, it makes the ENTIRE result false
          return false; 
        } else if (!list) { //the opposite of: if after the entire loop, all items are true
          return false;
        } else if( iterator(item) ) { //if item === true
           return true;
        }
    }, true)

    // var arrOfBools = _.map(collection, function(item) { 
    //   return Boolean(iterator(item))
    // }) //now we have an array of booleans only

    //   return _.reduce(arrOfBools, function(list,item) {
    //     if(!item) { //if current item is false, it makes the ENTIRE result false
    //       return false; 
    //     } else if (!list) { //the opposite of: if after the entire loop, all items are true
    //       return false;
    //     } else if(item) { //if item === true
    //        return true;
    //     }
    //   }, true) //start value



  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (!iterator) {
      iterator = _.identity;
    }
    return !(_.every(collection, function(item){
      return !iterator(item)
    })); //the opposit of _.every in the partial false/partial true results, so i return the opposite of every--must use parens!
    //but when i do that, we negate the assignment of _.dentity to the missing callback function, so I have to assign it again
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
//MY PSEUDO
//loop through from/source's properties and add them onto the to/destination obj
//return destination obj
//restriction 5-6 
  //"should extend from multiple source objects"
  //in the case of a conflict, it should use the last property's values when extending from multiple source objects
  //...something to do w the arguments object? loop through this IF there is more than one from-argument; arguments is an array-like object
  //loop through arguments-array; then loop through each objects' keys and values
  //also, there is no TO argument in this case?
  _.extend = function(to, from) { //({to}, {from}, {from} )

    var args = Array.prototype.slice.call(arguments); //turns the arguments-'array' into a real array, an array of objects; [{x:1}, {y:2}, {z:3}]
    from = args.slice(1, args.length); // indeces [1, 2, 3...args.length]; [{y:2}, {z:3}]
    to = args.shift();  // assigns first item/arg as the TO variable (destination), now args is changed (missing first element), [{x:1}]
    //nested objects inside arrays...2 nested each's? ugh
    _.each(from, function(value/*obj*/, index/*obj index*/) {
      _.each(value/*obj*/, function(val/*obj property value*/, key/*obj property key*/) {
        to[key] = val;
      });
    });
    return to;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
