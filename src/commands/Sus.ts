import { GuildMember, Message } from "discord.js";
import Command from "../bot/Command";

export default class Sus extends Command {
    readonly name = "sus"
    readonly description = "SUS"

    #icons_ok: Array<string> = [ 
        "<:gru:758826791166541895>", "<:shinigun:761636577801011201>", 
        "<:maldisioncop:700847114409869333>", "<:alberto_gun:761372353694793738>",
        "<:dipnait:761375300109205554>", "<:alonsogun:904349319098937345>"
    ];
    #icons_off: Array<string> = [ 
        "<:resad:846406345728458852>", "<:sad:650481544179482635>",
        "<:sad2:755199549668065310>", "<:saddog:775869002387030048>"
    ];
    
    public executed(message:Message):void {
        //let channelID = message.channel.id;
        //message.member?.guild?.members.fetch()
        //    .then( ( v ) =>  {
                let v: any = message.guild?.members.cache;
                let member: GuildMember | null = v.random( );
                let tries = 2;
                while ( member?.displayName === message.author.username || member?.displayName === "Winston" ) {
                    member = v.random( );
                    --tries;
                    if( tries < 0 )
                    {
                        member = null;
                        break;
                    }
                }
                let icon: string;
                if( member === null ) {
                    icon = this.random_response( this.#icons_off );
                } else {
                    icon = this.random_response( this.#icons_ok );
                }
                message.channel.send( `Hay un impostor entre nosotros... <:shini:408354759045677056>` )
                    .then((msg)=> {
                        setTimeout(function(){
                            if( member === null ) {
                                msg.edit( `> Hemos matado a un tripulante ${icon}` );
                            } else {
                                msg.edit( `> El impostor <@${member?.id}> ha muerto. ${icon}` );
                            }
                        }, 2500)
                    });
        //    })
        //    .catch( ( err ) => {
        //        message.channel.send( err );
        //    })
    }
}