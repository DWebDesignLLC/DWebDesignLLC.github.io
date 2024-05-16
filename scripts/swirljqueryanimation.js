// inspiration: https://www.sitepoint.com/frame-by-frame-animation-css-javascript/#1framebyframeanimationbychangingtheimagessource

//CHANGE class of $element below to match the HTML class of the img we're targeting
const $element = $('.swirl1');
//CHANGE the path below to match the folder containing the src imgs
const imagePath = '../scripts/swirl1/images';
const totalFrames = 99;
const animationDuration = 7150;
// TODO - figure out a proper formula for converting FPS into the above numbers
const timePerFrame = animationDuration / totalFrames;
let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 1;

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function step(startTime) {
  // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
  // first of all we calculate how much time has passed from the last time when frame was update
  if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
  timeFromLastUpdate = startTime - timeWhenLastUpdate;
  
  // then we check if it is time to update the frame
  if (timeFromLastUpdate > timePerFrame) {
    // and update it accordingly
    //CHANGE name and extension in +'' field accordingly to match sequence naming system
    $element.attr('src', imagePath + `/seq_0_${frameNumber}.jpg`);
    // reset the last update time
    timeWhenLastUpdate = startTime;
    
    // then increase the frame number or reset it if it is the last frame
    if (frameNumber >= totalFrames) {
      frameNumber = 1;
    } else {
      frameNumber = frameNumber + 1;
    }        
  }
  
  requestAnimationFrame(step);
}

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
//CHANGE path/image name to match, IF MULTIPLE JQUERY ANIMATIONS CHANGE DIV ID FORMAT TO BE UNIQUE TO EACH - unless using the same img base for each animation
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $('body').append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/seq_0_${i}.jpg');"></div>`);
  }
});

// wait for images to be downloaded and start the animation
$(window).on('load', () => {
  requestAnimationFrame(step);
});



//TODO - find a way to make the animation only start on hover (stays on still image before then)
//HOWTO - pick starting keyframe - simply change the img src on html doc to match the file/keyframe number you want it to start on (see below for possible issue if multiple animations are being controlled by same jquery)
    //HOWTO - animations start staggered then sync up- if multiple animations are being controlled by the same jquery doc, then once one of the animations gets to the point where its sequence number is the same as the total number of imgs in the sequence, all of the animations will be reset not just that one, so if one starts on a different keyframe than the others, it will change back to being in sync with them after that first reset