import * as tf from '@tensorflow/tfjs-node'

/**
     * To find indices of values in a particular array
     * @param x
     * @param values
     * @returns {{}}
     */
 export function findIndices (x, values) {
  let indices = [];
  console.log("values:", values);
  for (let i = 0; i < values.length; i++) {
      let localIndices = [];
      for (let j = 0; j < x.length; j++) {
          if (values[i] === x[j]) {
              localIndices.push([j]);
          }
      }
      indices.push(localIndices);
  }
  console.log("before:", indices);
  return indices;
};

/**
* Sort an array
*/
export function sort(x) {
  x = tf.tensor(x);
  try {
      if (x.shape.length !== 1)
          return null;
      return tf.reverse(tf.topk(x, x.shape[0]).values);
  } catch (error) {
      console.log(error);
      return null;
  }
};