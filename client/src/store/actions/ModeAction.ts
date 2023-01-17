import { ModeActionTypes } from "../action-types";

interface OfflineAction {
    type: ModeActionTypes.START_OFFLINE
}

interface OnlineAction {
    type: ModeActionTypes.START_ONLINE
}

export type ModeAction = OfflineAction | OnlineAction;