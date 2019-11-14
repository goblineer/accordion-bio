// BUTTON
// target the button and the nested icon
const button = document.querySelector("button");
const svg = button.querySelector("svg");
// number of milliseconds in which to animate the button
const duration = 100;
// number of seconds to delay the animation of the icon
const delay = 50;

// specify a transition for both elements
// ! transition uses seconds instead of milliseconds
button.style.transition = `transform ${duration / 1000}s ease-in`;
svg.style.transition = `transform ${duration / 1000}s ${delay / 1000}s ease-in`;

// boolean used to toggle between question and exclamation mark
let isQuestion = true;

// on click animate the button to move vertically before changint the appearance of the nested icon
// ! update the boolean used as the toggle
// remove the click event listener before the animation is complete
function handleClick() {
  isQuestion = !isQuestion;
  button.removeEventListener("click", handleClick);

  // animate the button upwards (and the icon slightly more upwards)
  button.style.transform = "translate(50%, calc(50% - 5px))";
  svg.style.transform = "translateY(-3px)";

  // animate the button downwards, whilst updating the nested icon
  // once the translation is complete re-position the svg to its original y coordinate
  // ! open/close every details element in accordance with the isQuestion boolean
  const timeoutID = setTimeout(() => {
    svg
      .querySelector("use")
      .setAttribute("href", `#${isQuestion ? "question" : "exclamation"}-mark`);
    button.style.transform = "translate(50%, 50%)";
    svg.style.transform = "translateY(0%)";
    // reattach the event listener
    button.addEventListener("click", handleClick);
    // update the details element to either open or close them all
    const details = document.querySelectorAll("details");
    details.forEach(detail => {
      isQuestion
        ? detail.removeAttribute("open", true)
        : detail.setAttribute("open", true);
    });
    clearTimeout(timeoutID);
  }, duration + delay);
}
button.addEventListener("click", handleClick);

// DETAILS & SUMMARY
// data describing the questions and answers
const faq = [
  {
    question: "Hi, Kate. What's your story?",
    answer:
      '<strong>Hi, there!  I am a software engineer, but I wasn\'t always.</strong>  I took the scenic route to a coding career.  Along the way, I majored in Science Writing, worked as a journalist and copy-editor for the Chicago Tribune, and managed several (amazing) independent bookstores.  Up until about a year ago, I was busy leveling up as a classroom teacher, developing curriculum and presenting subjects that ranged from formal logic to Norse mythology.<br><br>Then last winter, I earned the opportunity to study computer programming full-time at <a target="_blank" href="https://adadevelopers.org">Ada Developers Academy</a>.  The program was tremendously challenging and endlessly rewarding.  My secret weapon?  All of my prior experiences combined forces to form a real superhero of a core belief: <strong>EVERY problem can be an exciting adventure or a grueling battle; the difference is in the way you tell the story.</strong>'
  },
  {
    question: "Okay, but do you have coding experience?",
    answer:
      "I haven't been far from a command line ... ever. I've been working up my core skills since I couldn't reach the keyboard. My professional experience is in building business-critical applications from the ground up. In just the past few months, I've written and deployed  <strong>API's, AWS Lambda functions, and long-running processes in a cloud architecture</strong>. I've also taken command of <strong>DevOps with Serverless deployment, GitLab CI/CD, and metrics and tracing with Splunk and New Relic.</strong><br><br>I've been working in <code>JavaScript</code>, <code>Ruby</code>, and <code>Java</code> (and teaching in <code>Python</code>). I have proven my ability to ramp up quickly in new languages -- and ramping up in old languages is what I do for fun on the weekends! :)"
  },
  {
    question: "What else have you been up to?",
    answer:
      "I live in Seattle and I enjoy spending time on my bike finding new, interesting views of the city's many planes, trains, barges, and bridges -- and the giant, crazy machines that load, unload, and care for them. <br><br>At home, I like to knit, hang out with friends, and spend time with my pet parrot, Eugene. He never tires of sharing his opinions while looking extremely adorable. (He's on Instagram so I have a great excuse to take cute bird pictures, too.)"
  },
  {
    question: "Nice-looking block up in the corner",
    answer:
      'Thanks <span role="img">😊</span><br>It almost begs to be clicked...'
  }
];

// target the app container
const app = document.querySelector(".app");
// create a wrapping element in which to add the details & summaries
const appFaq = document.createElement("div");
appFaq.classList.add("app__faq");

// map through the faq array and add details element using the question in a summary element
// ! in the summary element include an svg icon to highlight the open/close toggle
const markup = faq
  .map(
    ({ question, answer }) => `
<details>
  <summary>
    ${question}
    <svg width="18" height="18">
      <use href="#arrow"></use>
    </svg>
  </summary>
  ${answer}
</details>
`
  )
  .join("");

appFaq.innerHTML = markup;

// append the element
app.appendChild(appFaq);