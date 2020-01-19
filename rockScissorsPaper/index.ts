interface IRSP {
  ROCK: "0";
  SCISSORS: "-142px";
  PAPER: "-284px";
}

const RSP: IRSP = {
  ROCK: "0",
  SCISSORS: "-142px",
  PAPER: "-284px"
};

const score = {
  SCISSORS: 1,
  ROCK: 0,
  PAPER: -1
};

let imageCoords: IRSP[keyof IRSP] = "0";
let interval: number;

const computerChoice = (imageCoords: IRSP[keyof IRSP]): string =>
  String(
    Object.keys(RSP).find(k => {
      const key = k as keyof IRSP;
      return RSP[key] === imageCoords;
    })
  );

const intervalMaker = () => {
  interval = setInterval(() => {
    const computerElem = document.querySelector("#computer") as HTMLDivElement;

    switch (imageCoords) {
      case RSP.ROCK:
        imageCoords = RSP.SCISSORS;
      case RSP.SCISSORS:
        imageCoords = RSP.PAPER;
      case RSP.PAPER:
        imageCoords = RSP.ROCK;
    }

    if (computerElem) {
      computerElem.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imageCoords} 0`;
    }
  }, 100);
};

const handleButtonClick = () => {
  const buttonElems = document.querySelectorAll<HTMLButtonElement>(".btn");

  buttonElems.forEach(button => {
    button.addEventListener("click", event => {
      const myChoice = (event.target as Element).textContent as keyof IRSP;
      const myScore = score[myChoice];
      const computerScore = score[computerChoice(imageCoords)];
      const diff = myScore - computerScore;

      if (diff === 0) {
        console.log("compare");
      } else if ([-1, 2].includes(diff)) {
        console.log("win");
      } else {
        console.log("lose");
      }

      clearInterval(interval);
      setTimeout(() => {
        intervalMaker();
      }, 1000);
    });
  });
};

const init = () => {
  intervalMaker();
  handleButtonClick();
};

init();
