import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({
  adapter: new Adapter(),
});

describe("<NavigationItems/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder setIngredient={() => {}} />);
  });

  it("should render <BuildControls />  if ingredients props is passed", () => {
    wrapper.setProps({
      ingredients: { salad: 0 },
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
