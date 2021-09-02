function main(dice) {
    const format = /^(\d*)[dD](\d+)([-+>]?)(\d*)$/;
    const matches = format.exec(dice);
    if (!matches) {
        return "Some of the dice you gave me were deformed. Dice should be formatted as nDf where n is optional number and f is faces.\n";
    }
    let [whole, numDice, numFaces, operator, bonus] = matches;
    if (operator && !bonus) {
        return dice + "what, exactly?";
    }
    if (bonus) bonus = Number.parseInt(bonus);
    numDice = Number.parseInt(numDice);
    numFaces = Number.parseInt(numFaces);
    const results = [];
    let successes = 0;
    let total = 0;
    for (let i = 0; i < numDice; i++) {
        let roll = rollDie(numFaces);
        if (operator === ">" && roll >= bonus) {
            results.push(`**${roll}**`);
            successes++;
        } else {
            results.push(roll);
        }
        total += roll;
    }
    if (operator === "+") {
        total += bonus;
    }
    if (operator === "-") {
        total -= bonus;
    }
    return (
        `I rolled those dice for you and got:\n` +
        `**${whole}**: [${results}]${operator}${bonus} totaling **${total}**\n` +
        (operator === ">" ? `There were **${successes}** successes\n` : ``)
    );
}

function rollDie(faces) {
    return Math.ceil(Math.random() * faces);
}
