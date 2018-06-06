"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
const INIT = 'screenContext/INIT';
const SET_CURRENT = 'screenContext/SET_CURRENT';
const DESTRUCT = 'screenContext/DESTRUCT';
const SAVE_STATE = 'screenContext/SAVE_STATE';
const SAVE_ANY = 'screenContext/SAVE_ANY';
const init = typesafe_actions_1.createStandardAction(INIT)();
const setCurrent = typesafe_actions_1.createStandardAction(SET_CURRENT)();
const destruct = typesafe_actions_1.createStandardAction(DESTRUCT)();
const saveState = typesafe_actions_1.createStandardAction(SAVE_STATE)();
const saveAny = typesafe_actions_1.createStandardAction(SAVE_ANY)();
const Actions = { init, setCurrent, destruct, saveState, saveAny };
exports.default = Actions;
