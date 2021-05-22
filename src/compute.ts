import { Socket } from "socket.io";
import { Op } from "./types";

export interface Computer {
  socket: Socket
}

export class Computer {
  constructor(socket: Socket){
    this.socket = socket;
  }

  emit_result(op:Op, result:any) {
    console.log("Emit Success");
    console.log(op);
    console.log(result, JSON.stringify({
        "op_type": op.op_type,
        "result": result,
        "values": op.values,
        "operator": op.operator,
        "op_id": op.op_id,
        "status": "success"
    }));

    this.socket.emit("op_completed", JSON.stringify({
        "op_type": op.op_type,
        "result": result,
        "values": op.values,
        "operator": op.operator,
        "op_id": op.op_id,
        "status": "success"
    }));
  }

  emit_error(op:Op, error:any) {
    console.log("Emit Error");
    console.log(op);
    console.log(error);

    this.socket.emit("op_completed", JSON.stringify({
      "op_type": op.op_type,
      "result": error.message,
      "values": op.values,
      "operator": op.operator,
      "op_id": op.op_id,
      "status": "failure"
    }));
  }

  getRandom(x:any[], size:number) {
    if (size === undefined) {
        return x[Math.floor(Math.random() * x.length)];
    } else {
        let result = [];
        for (let i = 0; i < size; i++) {
            result[i] = x.splice(Math.floor(Math.random() * x.length), 1)[0]
        }
        return result;
    }
  }

  execute(op:Op) {
    console.log("Computing " + op.operator);
    switch (op.operator) {
        case "linear":
            try {
                this.emit_result(op, op.values[0]);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "addition":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.add(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "subtraction":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.sub(y).arraySync();
                this.emit_result(op, result)
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "multiplication":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.mul(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                const result = error.message;
                this.emit_error(op, result);
            }
            break;
        case "division":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.div(y).arraySync();
                this.emit_result(op, result)
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "negation":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.neg().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error)
            }
            break;
        case "exponential":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.exp().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "natural_log":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.log().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "power":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.pow(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "square":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.square().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "cube":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.mul(x).mul(x).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "square_root":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.sqrt().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "cube_root":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.pow(1.0 / 3.0).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "absolute":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.abs().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "matrix_multiplication":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.matMul(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "multiply":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.mul(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "dot":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.dot(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "transpose":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.transpose().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "matrix_sum":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    const result = x.sum(axis).arraySync();
                    this.emit_result(op, result);
                } else {
                    const result = x.sum().arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "sort":
            try {
                const x = tf.tensor(op.values[0]);
                if (x.shape.length !== 1)
                    this.emit_error(op, "Invalid Input");
                const result = tf.reverse(tf.topk(x, x.shape[0]).values).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "split":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                let numOrSizeSplits = null;
                let axis = null;

                if ('numOrSizeSplits' in params) {
                    numOrSizeSplits = params.numOrSizeSplits;
                }
                if ('axis' in params) {
                    axis = params.axis;
                }

                if (numOrSizeSplits !== undefined && axis !== undefined) {
                    let result = tf.split(x, numOrSizeSplits, axis);
                    let finaL_result = [];
                    result.forEach(a => finaL_result.push(a.arraySync()));
                    this.emit_result(op, finaL_result);
                } else if (axis === undefined) {
                    let result = tf.split(x, numOrSizeSplits);
                    let finaL_result = [];
                    result.forEach(a => finaL_result.push(a.arraySync()));
                    this.emit_result(op, finaL_result);
                } else {
                    this.emit_error(op, "Parameter 'numOrSizeSplits' is missing");
                    return;
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "reshape":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('shape' in params) {
                    let shape = params.shape;
                    const result = x.reshape(shape).arraySync();
                    this.emit_result(op, result);
                } else {
                    this.emit_error(op, "Parameter 'shape' is missing");
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "concatenate":
            try {
                let values = op.values;
                let tensors = [];
                for (let i = 0; i < values.length; i++) {
                    tensors.push(tf.tensor(values[i]));
                }
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    if (axis !== undefined) {
                        let result = tf.concat(tensors, axis).arraySync();
                        this.emit_result(op, result);
                    } else {
                        let result = tf.concat(tensors).arraySync();
                        this.emit_result(op, result);
                    }
                } else {
                    let result = tf.concat(tensors).arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "min":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.min().arraySync();
                this.emit_result(op, result)
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "max":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.max().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "unique":
            try {
                let x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    let result = tf.unique(x, axis).values.arraySync();
                    this.emit_result(op, result);
                } else {
                    let result = tf.unique(x).values.arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "argmax":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    const result = x.argMax(axis).arraySync();
                    this.emit_result(op, result);
                } else {
                    const result = x.argMax().arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "argmin":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    const result = x.argMin(axis).arraySync();
                    this.emit_result(op, result);
                } else {
                    const result = x.argMin().arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "expand_dims":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    const result = x.expandDims(axis).arraySync();
                    this.emit_result(op, result);
                } else {
                    const result = x.expandDims().arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "inv":
            try {
                const x = tf.tensor(op.values[0]);
                const result = math.inv(x.arraySync());
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "gather":
            try {
                const x = tf.tensor(op.values[0]);
                const indices = op.values[1];
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    const result = x.gather(indices, axis).arraySync();
                    this.emit_result(op, result);
                } else {
                    const result = x.gather(indices).arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "reverse":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    const result = x.reverse(axis).arraySync();
                    this.emit_result(op, result);
                } else {
                    const result = x.reverse().arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "stack":
            try {
                let x = [];
                for (let i = 0; i < op.values.length; i++) {
                    x[i] = tf.tensor(op.values[i])
                }
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    const result = tf.stack(x, axis).arraySync();
                    this.emit_result(op, result);
                } else {
                    const result = tf.stack(x).arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "tile":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('reps' in params) {
                    let reps = params.reps;
                    const result = x.tile(reps).arraySync();
                    this.emit_result(op, result);
                } else {
                    this.emit_error(op, {message: "The parameter 'reps' is missing"});
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "slice":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('begin' in params) {
                    let begin = params.begin;
                    if ('size' in params) {
                        let size = params.size;
                        const result = x.slice(begin, size).arraySync();
                        this.emit_result(op, result);
                    } else {
                        const result = x.slice(begin).arraySync();
                        this.emit_result(op, result);
                    }
                } else {
                    this.emit_error(op, {message: "The parameter 'begin' is missing"});
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "find_indices":
            try {
                const x = op.values[0];
                const values = op.values[1];
                const result = tf.findIndices(x, values);
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "shape":
            try {
                const x = tf.tensor(op.values[0]);
                const result = x.shape;
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "greater":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.greater(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "greater_equal":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.greaterEqual(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "less":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.less(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "less_equal":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.lessEqual(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "equal":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.equal(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "not_equal":
            try {
                const x = tf.tensor(op.values[0]);
                const y = tf.tensor(op.values[1]);
                const result = x.notEqual(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "logical_and":
            try {
                const x = tf.tensor(op.values[0], undefined, 'bool');
                const y = tf.tensor(op.values[1], undefined, 'bool');
                const result = x.logicalAnd(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "logical_or":
            try {
                const x = tf.tensor(op.values[0], undefined, 'bool');
                const y = tf.tensor(op.values[1], undefined, 'bool');
                const result = x.logicalOr(y).arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "logical_not":
            try {
                const x = tf.tensor(op.values[0], undefined, 'bool');
                const result = x.logicalNot().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "logical_xor":
            try {
                const x = tf.tensor(op.values[0], undefined, 'bool');
                const y = tf.tensor(op.values[1], undefined, 'bool');
                const result = x.logicalXor().arraySync();
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "mean":
            try {
                const x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('axis' in params) {
                    let axis = params.axis;
                    let result = x.mean(axis).arraySync();
                    if (x.shape.length === 2) {
                        if (axis === 0) {
                            result = tf.tensor2d(result, [1, result.length]).arraySync();
                        } else if (axis === 1) {
                            result = tf.tensor2d(result, [result.length, 1]).arraySync();
                        }
                    }
                    this.emit_result(op, result);
                } else {
                    let result = x.mean().arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "average":
            try {
                const x = tf.tensor(op.values[0]);
                if ('axis' in op.params) {
                    let axis = op.params.axis;
                    const result = x.mean(axis).arraySync();
                    this.emit_result(op, result);
                } else {
                    const result = x.mean().arraySync();
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "mode":
            try {
                const x = tf.tensor(op.values[0]);
                if (x.shape.length === 1) {
                    const result = math.mode(x.arraySync());
                    console.log(result);
                    this.emit_result(op, result);
                } else if (x.shape.length === 2) {
                    let params = op.params;
                    if ('axis' in params) {
                        let axis = params.axis;
                        let result = math.mode(x.arraySync(), axis);

                        if (x.shape.length === 2) {
                            if (axis === 0) {
                                result = tf.tensor2d(result, [1, result.length]).arraySync();
                            } else if (axis === 1) {
                                result = tf.tensor2d(result, [result.length, 1]).arraySync();
                            }
                        }
                        console.log(result);
                        this.emit_result(op, result);
                    } else {
                        const result = math.mode(x.arraySync());
                        console.log(result);
                        this.emit_result(op, result);
                    }
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "median":
            try {
                const x = tf.tensor(op.values[0]);
                if (x.shape.length === 1) {
                    const result = math.median(x.arraySync());
                    console.log(result);
                    this.emit_result(op, result);
                } else if (x.shape.length === 2) {
                    let params = op.params;
                    if ('axis' in params) {
                        let axis = params.axis;
                        let result = math.median(x.arraySync(), axis);

                        if (x.shape.length === 2) {
                            if (axis === 0) {
                                result = tf.tensor2d(result, [1, result.length]).arraySync();
                            } else if (axis === 1) {
                                result = tf.tensor2d(result, [result.length, 1]).arraySync();
                            }
                        }
                        console.log(result);
                        this.emit_result(op, result);
                    } else {
                        const result = math.median(x.arraySync());
                        console.log(result);
                        this.emit_result(op, result);
                    }
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "variance":
            try {
                const x = tf.tensor(op.values[0]);
                if (x.shape.length === 1) {
                    const result = math.variance(x.arraySync());
                    console.log(result);
                    this.emit_result(op, result);
                } else if (x.shape.length === 2) {
                    let params = op.params;
                    if ('axis' in params) {
                        let axis = params.axis;
                        let result = math.variance(x.arraySync(), axis);

                        if (x.shape.length === 2) {
                            if (axis === 0) {
                                result = tf.tensor2d(result, [1, result.length]).arraySync();
                            } else if (axis === 1) {
                                result = tf.tensor2d(result, [result.length, 1]).arraySync();
                            }
                        }
                        console.log(result);
                        this.emit_result(op, result);
                    } else {
                        const result = math.variance(x.arraySync());
                        console.log(result);
                        this.emit_result(op, result);
                    }
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "standard_deviation":
            try {
                const x = tf.tensor(op.values[0]);
                if (x.shape.length === 1) {
                    const result = math.std(x.arraySync(), "uncorrected");
                    console.log(result);
                    this.emit_result(op, result);
                } else if (x.shape.length === 2) {
                    let params = op.params;
                    if ('axis' in params) {
                        let axis = params.axis;
                        let result = math.std(x.arraySync(), axis, "uncorrected");

                        if (x.shape.length === 2) {
                            if (axis === 0) {
                                result = tf.tensor2d(result, [1, result.length]).arraySync();
                            } else if (axis === 1) {
                                result = tf.tensor2d(result, [result.length, 1]).arraySync();
                            }
                        }
                        console.log(result);
                        this.emit_result(op, result);
                    } else {
                        const result = math.std(x.arraySync(), "uncorrected");
                        console.log(result);
                        this.emit_result(op, result);
                    }
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "percentile":
            try {
                let x = tf.tensor(op.values[0]);
                let params = op.params;
                if ('value' in params) {
                    let value = params.value;
                    let result = percentile(x.arraySync(), value);
                    this.emit_result(op, result);
                } else {
                    this.emit_error(op, "Parameter 'value' is missing");
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "random":
            try {
                let x = op.values[0];
                let params = op.params;
                if ('size' in params) {
                    let size = params.size;
                    const result = this.getRandom(x, size);
                    this.emit_result(op, result);
                } else {
                    const result = this.getRandom(x, undefined);
                    this.emit_result(op, result);
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;

        case "bincount":
            try {
                let x = tf.tensor(op.values[0]);
                let params = op.params;
                let weights = params.weights;
                let minlength = params.minlength;
                if ('weights' in params && 'minlength' in params) {
                    let result = tf.bincount(x.arraySync(), weights, minlength);
                    this.emit_result(op, result);
                } else {
                    this.emit_error(op, "Parameter 'weights' or 'minlength is missing");
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "where":
            try {
                let a = tf.tensor(op.values[0]);
                let b = tf.tensor(op.values[0]);
                let params = op.params;
                if ('condition' in params) {
                    let condition = params.condition;
                    let result = tf.bincount(condition, a.arraySync(), b.arraySync());
                    this.emit_result(op, result);
                } else {
                    this.emit_error(op, "Parameter 'condition' is missing");
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "sign":
            try {
                const x = tf.tensor(op.values[0]);
                const result = tf.sign(x.arraySync());
                this.emit_result(op, result);
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "foreach":
            try {
                const x = tf.data.array(op.values[0]);
                let params = op.params;
                if ('operation' in params) {
                    let operation = params.operation;
                    let outputs = [];
                    x.forEachAsync(function (a) {
                        let params1 = params;
                        delete params1.operation;
                        let paramsNames = Object.keys(params1);
                        let paramsString = "";
                        for (let i = 0; i < paramsNames.length; i++) {
                            paramsString = paramsString + "," + params1[paramsNames[i]];
                        }
                        console.log(paramsString, a, "tf." + operation + "(" + JSON.stringify(a) + paramsString + ").arraySync()");
                        let output = eval("tf." + operation + "(" + JSON.stringify(a) + paramsString + ").arraySync()");
                        console.log(output);
                        outputs.push(output);

                        // TODO: fix the logic
                        if (outputs.length === x.size) {
                            this.emit_result(op, outputs);
                        }
                    });
                } else {
                    this.emit_error(op, "Parameter 'operation' is missing");
                }

            } catch (error) {
                this.emit_error(op, error);
            }
            break;
        case "one_hot_encoding":
            try {
                const x = tf.tensor(op.values[0], null, 'int32');
                let params = op.params;
                if ('depth' in params) {
                    const depth = params.depth;
                    const result = tf.oneHot(x, depth).arraySync();
                    this.emit_result(op, result);
                } else {
                    this.emit_result(op, "Parameter 'depth' is missing");
                }
            } catch (error) {
                this.emit_error(op, error);
            }
            break;
    }
  }
}