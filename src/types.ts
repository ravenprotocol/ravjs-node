interface Op {
  op_id: string,
  op_type: string,
  operator: string,
  result: string,
  values: any[],
  status: string,
  // TODO: better typing for op params
  params: any,
}

export {
  Op,
};