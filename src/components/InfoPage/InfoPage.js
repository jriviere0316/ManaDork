import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => (
  <div>
    <h1>How to play Magic: The Gathering</h1>

<p>Magic: The Gathering is a wonderful game that has you slinging spells at friends and enemies with one aim: to win. It has been around since 1993 and has gained popularity over the years due to its fun nature and depth of game mechanics. There are even people who make their living from playing Magic in tournaments around the world!
<br/><br/>
As a result of the level of play that you can reach, starting off can feel daunting. Because of this, there are lots of articles online to help you understand how to play this classic card game. This article is going to focus on the way each turn progresses. While this is taken care of automatically in Magic: The Gathering Arena, it very much isn’t in paper MtG. So, in order to learn how the game will progress, you can simply read on.
<br/><br/>
Beginning Phase
<br/><br/>
The very first part of every turn consists of three parts. Each of these parts is mandatory and can’t be skipped. This is important because if you were to miss your Untap Step you’d be left without Mana for that turn.
<br/><br/>
Untap Step
<br/><br/>
This is where you untap all of your permanents. This means Lands, Creatures, Artifacts, and anything else you might have in play. This is essential to your being able to cast spells or attack.
<br/><br/>
Upkeep Step
<br/><br/>
Many effects take place in this step, but none by default. There are lots of spells which have “in your Upkeep” on them so it is important to know where it is.
<br/><br/>
Draw Step
<br/><br/>
You draw a card from your library here. Just the one though. In the event there are no cards in your library and you go to draw then you lose the game. This is relevant to certain strategies in MtG.
<br/><br/>
Main Phase (1)
<br/><br/>
This is where you can play your cards. The early turns usually involve you playing a Land card here followed by a spell, but there is some merit to leaving that until the second Main Phase depending on what you want to bluff.
<br/><br/>
Combat Phase
<br/><br/>
The Combat Phase is broken into parts in order to allow for different stages of interactions at “Instant Speed” which tends to be Instant spells and activated abilities.
<br/><br/>
Beginning of Combat Step
<br/><br/>
This is the stage where an opponent could use spells that tap your creatures down in order to stop them attacking.
<br/><br/>
Declare Attackers Step
<br/><br/>
This is where you choose which creatures are attacking, once you leave this step your decisions are permanent for that turn.
<br/><br/>
Declare Blockers Step
<br/><br/>
Blockers are declared by your opponent in order to defend against incoming attacks.
<br/><br/>
Combat Damage Step
<br/><br/>
Damage is the last thing to happen in the Combat Phase. First Strike damage happens first and then the rest occurs.
<br/><br/>
End of Combat Step
<br/><br/>
It is what it says it is.
<br/><br/>
Main Phase (2)
<br/><br/>
Your final chance to cast any permanents or Sorcery spells in your turn. Once you decide to move from this phase you should be ready for your turn to end.
<br/><br/>
Ending Phase
<br/><br/>
The last bit has a few relevant steps, it is the last chance for people to cast “Instant Speed” things or use abilities.
<br/><br/>
End Step
<br/><br/>
Weirdly, this is not the last bit of this phase. There are a few effects which apply to this step, for example, some creatures have to be sacrificed in the End Step.
<br/><br/>
Cleanup Step
<br/><br/>
The final phase of each turn has the player discarding down to hand size (7). If something happens during this step that causes you to draw more cards, then the phase can keep going. Generally speaking, nothing will happen though.
<br/><br/>
You should have a rough idea of how the steps progress now. The best practice and learning comes from playing though, so get out there and give the game a go. You can find everything else we have on Magic: The Gathering here in our Hub.
<br/><br/>
</p>
  </div>
);

// If you needed to add local state or other things,
// you can make it a class component like:

/*
class InfoPage extends React.Component {

  render() {
    return (
      <div>
        <p>Info Page</p>
      </div>
    )
  }
}
*/
export default InfoPage;
