import { start } from './index.js';
import {carrouselImageHandler} from './utils.js';

start();

// const increment = util(3, 1 , 'next');
// const decrement = util(3, 2 , 'previous');
// const increment0 = util(3, 2 , 'next');
// const decrementMax = util(3, 0 , 'previous');

const increment = carrouselImageHandler(3, 1 , 'next');
const decrement = carrouselImageHandler(3, 2 , 'previous');
const increment0 = carrouselImageHandler(3, 2 , 'next');
const decrementMax = carrouselImageHandler(3, 0 , 'previous');

// { increment: 2, decrement: 1, increment0: 0, decrementMax: 2 }

console.log({ increment, decrement, increment0, decrementMax});

