"use_strict";

var list = []

var stepNo = 1

function addCard(c) {
//    c = new CardObject("Title", "Type", "text", undefined);
    list.push(c);
    updateCards(list);
    window.scrollTo(0,document.body.scrollHeight);
    return this.c;
}

function removeLastCard() {
    
    c = undefined;
    if (stepNo > 1) {
        stepNo--;
        var c = list.pop();
        updateCards(list);
        window.scrollTo(0,document.body.scrollHeight);
    }
    return c;
}

function updateCards(list) {

    document.getElementById("content").innerHTML = "";
    for (var object of list) {

        if (object != undefined) {
            document.getElementById("content").appendChild(object.toHTML());
        }
    }
}

class CardObject {

    constructor(title, type, text, image) { 
        this.title = title;
        this.type = type;
        this.text = text;
        this.image = image;
    }

    toHTML() {

        // hier ist noch irgendwo ein fehler!!
        var card = document.createElement("div");
        card.className = "card";
        var container = document.createElement("div");
        container.className = "container";
        if (this.image !== undefined) {
            var image = document.createElement("img");
            image.src = this.image;
            image.alt = this.title;
            image.style = "float:left;margin:10px;height:100px;width:100px"
            card.appendChild(image);
        }
        container.innerHTML = "<h4><b>" + this.title + "</b></h4>" +
            "<h5>" + this.type + "</h5><p>" + this.text + "</p>";
        card.appendChild(container);
        return card;
    }
}

function addQuickCast() {

    var roll = Math.ceil(Math.random()*4);
    if (stepNo < 12) {
        roll = Math.ceil(Math.random()*2);
    }
    //addCard(new CardObject(roll, "", "", undefined))
    if (roll == 1) {
        var rolldir = Math.ceil(Math.random()*4);
        if (rolldir == 1) {
            addCard(new CardObject("Move North", "Step " + stepNo + ":Move North", "Move Enemy Mage North", "north.jpg"));
        }
        if (rolldir == 2) {
            addCard(new CardObject("Move East", "Step " + stepNo + ":Move East", "Move Enemy Mage East", "east.jpg"));
        }
        if (rolldir == 3) {
            addCard(new CardObject("Move South", "Step " + stepNo + ":Move South", "Move Enemy Mage South", "south.jpg"));
        }
        if (rolldir == 4) {
            addCard(new CardObject("Move West", "Step " + stepNo + ":Move West", "Move Enemy Mage West", "west.jpg"));
        }
    }
    if (roll == 2) {
        addCard(new CardObject("Summon Creature", "Step " + stepNo + ":Creature", "Draw a creature from creature deck and put it into the zone of the enemy mage. Add an inactive action marker to it.", "creature.jpg"));
    }
    if (roll == 3) {
        var rollcast = Math.ceil(Math.random()*2);
        if (rollcast == 1) {
            addCard(new CardObject("Cast Enchantment", "Step " + stepNo + ":Enchantment", "Draw an enchantment from the enchantment deck:<br>"
            +" - Enemy Zone enchantment: cast to affect as many of your creatures or your mage as possible within range.<br>"
            +" - Enemy Creature enchantment: cast on your creatures or your mage - target is the one with highest life value within range."
            +" - Friendly Creature enchantment: cast on enemy creature or enemy mage - target is the one with lowest life value within range.", "enchantment.jpg"));
        }
        if (rollcast == 2) {
            addCard(new CardObject("Cast Incantation", "Step " + stepNo + ":Incantation", "Draw an incantation from the incantation deck:<br>"
            +" - Enemy Zone incantation: cast to affect as many of your creatures or your mage as possible within range.<br>"
            +" - Enemy Creature incantation: cast on your creatures or your mage - target is the one with highest life value within range."
            +" - Friendly Creature incantation: cast on enemy creature or enemy mage - target is the one with lowest life value within range.", "incantation.jpg"));
        }
    }
    if (roll == 4) {
        addCard(new CardObject("Cast Attack", "Step " + stepNo + ":Cast Attack", "Draw an attack spell from attack spell deck:<br>"
        +" - Priorized target is your mage. If out of range, target is the closest of your creatures. If more than one choose the one with highest life." 
        +" - Enemy Zone attack: cast to affect as many of your creatures or your mage as possible within range.<br>"
        +" - Enemy Creature attack: cast on your creatures or your mage - target is the one with highest life value within range.", "attack.jpg"));
    }
    stepNo++;
}

function addFullAction() {
    addCard(new CardObject("Creature/Mage Action", "Step " + stepNo + ":Full Action", "Creature/Mage Action<br>"
    +" - Full Action attack. Priorized target is your mage. If out of range, target is the closest of your creatures. If more than one choose the one with highest life. If all creatures are out of range:<br>"
    +" - Move 1 Zone (see below) and perform a Quick Action attack. Same priorization as in Full Action attack. If still out of range:<br>"
    +" - Move another zone: Move towards your mage. If one of your creatures has a higher remaining life than your mage move towards it.<br>"
    +" * The creature will try to go through walls if your mage is in the zone on the other side. If the wall is impenetrateable it will be attacked.<br>"
    +" * Once a creture is engaged in a battle, it will not move until all creatures/mages in range are destroyed.", "full.png"));
    stepNo++;
}

addCard(new CardObject("Game Setup", "Suggested starting decks for AI enemy", 
    "This gaming setup is intended for single player Mage Wars(r) games. If follows the <a href='https://boardgamegeek.com/filepage/94853/magewars-solo-variant-rules'>concept created by Dan Cavaliere at boardgamegeek</a>.<br>" 
    +" 1. Place an enemy mage with 2 quickcast markers and 1 action marker in the opposite zone.<br>"
    +" 2. Create 4 Card decks (e.g. like in following table): Creature deck (15 cards), Enchantment deck (10 cards), Incantation deck (10 cards) and an Attack Spell deck (10 cards):<br>"
    + "<table><thead><tr><th>Creature Deck<br>(15 Cards)</th><th>Enchantment Deck<br>(10 Cards)</th><th>Incantation Deck<br>(10 Cards)</th><th>Attack Spells Deck<br>(10 Cards)</th></tr></thead>"
    +"<tbody><tr><td>2x Bitterwood Fox</td><td>2x Agony</td><td>2x Battle Fury  </td><td>2x Blinding Flash</td></tr>"
    +" <tr><td>Brogan Bloodstone</td><td>2x Bear Strength</td><td>Heal</td><td>2x Electrify</td></tr>"
    +" <tr><td>2x Darkfenne Bat</td><td>2x Bull Endurance</td><td>Knockdown  </td><td>Fireball</td></tr>"
    +" <tr><td>Darkfenne Hydra </td><td>Eagle Wings  </td><td>Banish   </td><td>Flameblast</td></tr>"
    +" <tr><td>Emerald Tegu  </td><td>Falcon Precision  </td><td>2x Perfect Strike</td><td>Jet Stream </td></tr>"
    +" <tr><td>Firebrand Imp  </td><td>2x Maim Wings</td><td>2x Charge</td><td>Pillar of Light</td></tr>"
    +" <tr><td>Gorgon Archer  </td><td>   </td><td>Purge Magic  </td><td>Ring of Fire </td></tr>"
    +" <tr><td>Highland Unicorn </td><td>   </td><td>   </td><td>Thunderbolt  </td></tr>"
    +" <tr><td>Dark Pact Slayer </td><td>   </td><td>&nbsp;</td><td>&nbsp;</td></tr>"
    +" <tr><td>Mana Leech</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"
    +" <tr><td>Skeletal Sentry</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"
    +" <tr><td>Stonegaze Basilisk</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>"
    +" <tr><td>Timber Wolf  </td><td>&nbsp;</td><td>&nbsp;</td><td></td></tr>"
    +"</tbody></table><br>"
    +"The enemy mage does not use mana to cast spells. They just get drawn from the decks in a random order.<br>"
    +"The enemy mage does use a quickcast move before and after the action phase (therefore twice).<br>"
    +"", "setup.jpg"))
