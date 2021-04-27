import React from "react";
import { ___ComponentName___Props } from "./___ComponentName___Interfaces";
import { use___ComponentName___Styles } from "./___ComponentName___Styles";
import { use___ComponentName___ViewModel } from "./___ComponentName___ViewModel";

const ___Component_Name___: React.FunctionComponent<___ComponentName___Props> = (
  props
) => {
  const viewModel = use___ComponentName___ViewModel(props);
  const classes = use___ComponentName___Styles();

  return <h1>___ComponentName___</h1>;
};

export default ___Component_Name___;
