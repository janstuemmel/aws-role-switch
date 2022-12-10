import * as React from "react";
import { Story } from '@ladle/react';

import { generateConfigItems } from "../../common/test/fakeConfig";
import { Popup } from "./Popup";

import '../popup.scss';

export const PopupWith_2000Entries = () => <Popup roles={generateConfigItems(2000, 600)} />;
export const PopupWith_1000Entries = () => <Popup roles={generateConfigItems(1000, 300)} />;
export const PopupWith_100Entries = () => <Popup roles={generateConfigItems(100, 30)} />;
export const PopupWith_10Entries = () => <Popup roles={generateConfigItems(10, 3)} />;
export const PopupWith_0Entries = () => <Popup roles={generateConfigItems(0, 0)} />;
export const PopupControlable: Story<{ items: number, groups: number }> = ({ items, groups }) => {
  items = items ? items : 0;
  groups = groups ? groups : 0;
  return <Popup roles={generateConfigItems(items, groups)} />;
};

PopupControlable.args = {
  items: 30,
  groups: 6,
};
