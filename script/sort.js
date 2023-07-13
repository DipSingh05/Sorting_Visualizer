var url = new URL(window.location.href);
var searchParams = new URLSearchParams(url.search);
var param1 = searchParams.get('data');
var data = JSON.parse(param1);

const title = document.getElementById('sort-title');
const range = document.getElementById('customRange');
const rangeValue = document.getElementById('range-value');
const details = document.getElementById('sort-details');
const steps = document.getElementById('sort-steps');
const tc = document.getElementById('sort-tc');
const sc = document.getElementById('sort-sc');
const navbar = document.getElementById('navigation');
const container = document.getElementById('main-container');
const code = document.getElementById('codeDiv');
const codebtn = document.getElementsByClassName('codeBtn');
const sortBtn = document.getElementById('sortBtn');

function activediv() {
  for (let i = 0; i < codebtn.length; i++) {
    const element = codebtn[i];
    if (element.classList.contains('active')) {
      n = element.getAttribute('name');
      code.innerText = data['Code'][n];
      element.setAttribute('disable', true);
      return element;
    } else {
      continue;
    }
  }
}
activediv();
console.log(data['Code']['C++']);
for (let i = 0; i < codebtn.length; i++) {
  const element = codebtn[i];
  element.addEventListener('click', () => {
    ele = activediv();
    n = element.getAttribute('name');
    if (n == 'Python') {
      ele.classList.remove('active');
      element.classList.add('active');
      code.innerText = data['Code'][n];

    } else if (n == 'Java') {
      ele.classList.remove('active');
      element.classList.add('active');
      code.innerText = data['Code'][n];

    } else if (n == 'JavaScript') {
      ele.classList.remove('active');
      element.classList.add('active');
      code.innerText = data['Code'][n];

    } else if (n == 'C++') {
      ele.classList.remove('active');
      element.classList.add('active');
      code.innerText = data['Code'][n];

    } else if (n == 'C') {
      ele.classList.remove('active');
      element.classList.add('active');
      code.innerText = data['Code'][n];

    } else {
      console.log("error code");
    }
  })

}

container.style.marginTop = navbar.offsetHeight + 10 + "px";

// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

title.innerHTML = data['Name'];
rangeValue.textContent = "[ " + range.value + " ]";
range.addEventListener('input', function () {
  if (range.value < 1) {
    rangeValue.textContent = "[ " + range.value + 1 + " ]";
  } else if (range.value >= 10) {
    rangeValue.textContent = "[ " + range.value + " ]";
  } else {
    rangeValue.textContent = "[ 0" + range.value + " ]";
  }
});

details.innerHTML = data['Desc'];

var s = JSON.stringify(data['Steps']);
s = s.replace('[', '');
s = s.replace(']', '');
s = s.split(',');

for (let i = 0; i < s.length; i++) {
  var element = s[i];
  element = element.replace('"', '');
  element = element.replace('"', '');
  const li = document.createElement('li');
  li.classList.add('m-2');
  li.innerHTML = element;
  steps.appendChild(li);
}

t = data['TimeComplexity'];
key = Object.keys(t);
for (let i = 0; i < key.length; i++) {
  var element = key[i];
  const h = document.createElement('h5');
  h.classList.add('m-2');
  h.innerHTML = key[i] + " :  " + t[key[i]];
  tc.appendChild(h);
}

s = data['SpaceComplexity'];
sc.innerHTML = "Space Complexity:  " + s;

//

const barsContainer = document.getElementById("barcontainer");
const swapSound = new Audio('/sounds/notification.wav');
const overSound = new Audio('/sounds/over.wav');
const suffleSound = new Audio('/sounds/alert.wav');

let bars = [];

function generateBars() {
  bars = [];
  barsContainer.innerHTML = '';
  for (let i = 0; i < range.value; i++) {
    const height = Math.floor(Math.random() * 300) + 10;
    bars.push(height);
    const bar = document.createElement('div');
    bar.style.height = `${height}px`;
    barsContainer.appendChild(bar);
  }
}

let currentIndex = -1;


function renderBars() {
  barsContainer.innerHTML = '';

  for (let i = 0; i < bars.length; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${bars[i]}px`;

    const number = document.createElement('span');
    number.classList.add('bar-number');
    number.textContent = Math.floor(bars[i] / 10);

    // Set the color of the bar based on its state
    if (i === currentIndex) {
      bar.style.backgroundColor = 'red'; // Set the current bar to green
    } else {
      bar.style.backgroundColor = 'blue'; // Set other bars to blue
    }

    bar.appendChild(number);
    barsContainer.appendChild(bar);
  }
}



function shuffle() {
  generateBars();
  for (let i = bars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bars[i], bars[j]] = [bars[j], bars[i]];
  }
  suffleSound.currentTime = 0;
  suffleSound.play();
  renderBars();
}

function sorting() {
  sortBtn.setAttribute('disabled', true);
  if (data['Name'] == "Bubble Sort") {
    bubbleSort();
  } else if (data['Name'] == "Heap Sort") {
    heapSort();
  } else if (data['Name'] == "Selection Sort") {
    selectionSort();
  } else if (data['Name'] == "Insertion Sort") {
    insertionSort();
  } else if (data['Name'] == "Merge Sort") {
    mergeSortAnimation();
  } else if (data['Name'] == "Quick Sort") {
    quickSortAnimation();
  } else {

  }
}

function animateGreenColor() {
  const b = document.getElementsByClassName('bar');
  const lastIndex = b.length - 1;

  // Reset all bar colors to blue
  for (let i = 0; i < b.length; i++) {
    b[i].style.backgroundColor = 'blue';
  }

  // Animate the green color traveling through the bars
  let index = 0;
  const animateNextBar = () => {
    if (index < b.length) {
      b[index].style.backgroundColor = 'green';
      if (index > 0) {
        b[index - 1].style.backgroundColor = 'blue'; // Change the previous bar color to blue
      }
      index++;
      setTimeout(animateNextBar, 100); // Adjust the delay between bars (in milliseconds)
    } else if (index === b.length) {
      b[lastIndex].style.backgroundColor = 'blue'; // Change the last bar color to blue
    }
  };
  currentIndex = -1;
  overSound.currentTime = 0;
  overSound.play();
  animateNextBar();
  sortBtn.removeAttribute('disabled');
}



// Sleep function for delaying rendering
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const stepsContainer = document.getElementById('stepsContainer'); // Div container for displaying steps

function displaySteps(steps) {
  stepsContainer.innerHTML = '';

  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const stepDiv = document.createElement('div');
    stepDiv.style.color = "white";
    stepDiv.textContent = `Step ${i + 1}: [ ${step.join(', ')} ]`;
    stepsContainer.appendChild(stepDiv);
  }
}


async function bubbleSort() {
  const steps = []; // Array to store each step's state

  for (let i = 0; i < bars.length - 1; i++) {
    for (let j = 0; j < bars.length - i - 1; j++) {
      if (bars[j] > bars[j + 1]) {
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
        currentIndex = j + 1; // Highlight the current bar being overlapped
        renderBars();
        swapSound.currentTime = 0; // Reset the sound to the beginning
        swapSound.play(); // Play swap sound

        // Store the current step's state in the steps array
        const stepState = [...bars]; // Create a copy of the bars array
        steps.push(stepState);
        // Display the steps in the steps container
        displaySteps(steps);
        await sleep(1000);
      }
    }
  }
  currentIndex = -1; // Reset the current bar index
  renderBars();
  animateGreenColor();
}

// Insertion sort algorithm
async function insertionSort() {
  const steps = []; // Array to store each step's state

  for (let i = 1; i < bars.length; i++) {
    let j = i - 1;
    const value = bars[i];
    while (j >= 0 && bars[j] > value) {
      bars[j + 1] = bars[j];
      j--;
      currentIndex = j + 1; // Highlight the current bar being checked
      renderBars();
      swapSound.currentTime = 0; // Reset the sound to the beginning
      swapSound.play(); // Play swap sound
      await sleep(1000);
    }
    bars[j + 1] = value;
    currentIndex = -1; // Reset the current bar index
    renderBars();

    // Store the current step's state in the steps array
    const stepState = [...bars]; // Create a copy of the bars array
    steps.push(stepState);
    // Display the steps in the steps container
    displaySteps(steps);
    await sleep(100);
  }
  animateGreenColor();
}



// Selection sort algorithm
async function selectionSort() {
  const steps = []; // Array to store each step's state

  for (let i = 0; i < bars.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < bars.length; j++) {
      if (bars[j] < bars[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [bars[i], bars[minIndex]] = [bars[minIndex], bars[i]];
      swapSound.play(); // Play swap sound
    }
    currentIndex = minIndex; // Highlight the current bar being checked
    renderBars();

    // Store the current step's state in the steps array
    const stepState = [...bars]; // Create a copy of the bars array
    steps.push(stepState);
    // Display the steps in the steps container
    displaySteps(steps);

    await sleep(1000);
  }
  currentIndex = -1; // Reset the current bar index
  renderBars();
  animateGreenColor();
}


// Merge sort algorithm
async function mergeSortAnimation() {
  const steps = []; // Array to store each step's state

  const sorted = await mergeSort(bars);
  for (let i = 0; i < bars.length; i++) {
    bars[i] = sorted[i];
    currentIndex = i; // Highlight the current bar being checked
    swapSound.play(); // Play over sound
    renderBars();

    // Store the current step's state in the steps array
    const stepState = [...bars]; // Create a copy of the bars array
    steps.push(stepState);
    // Display the steps in the steps container
    displaySteps(steps);

    await sleep(1000);
  }
  currentIndex = -1; // Reset the current bar index
  renderBars();
  animateGreenColor();
}



async function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  const sortedLeft = await mergeSort(left);
  const sortedRight = await mergeSort(right);
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

async function quickSortAnimation() {
  const steps = []; // Array to store each step's state
  await quickSort(0, bars.length - 1, steps);
  renderBars();
  displaySteps(steps);
}

async function quickSort(low, high, steps) {
  if (low < high) {
    const partitionIndex = await partition(low, high, steps);
    await quickSort(low, partitionIndex - 1, steps);
    await quickSort(partitionIndex + 1, high, steps);
  }
}

async function partition(low, high, steps) {
  const pivot = bars[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (bars[j] < pivot) {
      i++;
      [bars[i], bars[j]] = [bars[j], bars[i]];
      renderBars();
      await sleep(1000);
    }
  }
  [bars[i + 1], bars[high]] = [bars[high], bars[i + 1]];
  renderBars();
  swapSound.play();
  const stepState = [...bars]; // Create a copy of the bars array
  steps.push(stepState);
  await sleep(1000);
  return i + 1;
}




async function heapSort() {
  const n = bars.length;
  const steps = []; // Array to store each step's state

  // Build the max heap
  await buildMaxHeap(steps);

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move the current root (maximum element) to the end
    swapBars(0, i, steps);
    currentIndex = i; // Highlight the current bar being checked
    renderBars();
    await sleep(1000);

    // Call maxHeapify on the reduced heap
    await maxHeapify(0, i, steps);
    currentIndex = -1; // Reset the current bar index
    renderBars();
  }
  animateGreenColor();
  displaySteps(steps);
}

// Build max heap
async function buildMaxHeap(steps) {
  const n = bars.length;
  const start = Math.floor(n / 2) - 1;

  // Build the heap from the last non-leaf node
  for (let i = start; i >= 0; i--) {
    await maxHeapify(i, n, steps);
  }
}

// Max heapify
async function maxHeapify(i, heapSize, steps) {
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  let largest = i;

  // over the root with left child
  if (left < heapSize && bars[left] > bars[largest]) {
    largest = left;
  }

  // over the largest with right child
  if (right < heapSize && bars[right] > bars[largest]) {
    largest = right;
  }

  // If the largest is not the root, swap and continue heapifying
  if (largest !== i) {
    swapBars(i, largest, steps);
    renderBars();
    await sleep(300);
    await maxHeapify(largest, heapSize, steps);
  }
}

// Swap bars
function swapBars(i, j, steps) {
  swapSound.play(); // Play swap sound
  [bars[i], bars[j]] = [bars[j], bars[i]];
  const stepState = [...bars]; // Create a copy of the bars array
  steps.push(stepState);
}


generateBars()
renderBars()


