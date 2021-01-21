import {Suscriptor} from "@lottielabs/bottie";

export default class ReadyLog extends Suscriptor<"ready"> {
    readonly event_type:"ready" = "ready"

    notified():void {
        console.log("Beepboop o/");
    }
}
