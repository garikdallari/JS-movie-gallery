import refs from './refs';
import axios from 'axios';
import { API_KEY } from './searchProps';

const { headerBtns } = refs;

// openWatchedList();

// ===== CREATE LOCAL_STORAGE LIST
function createLocalList(listKey) {
  const storedList = JSON.stringify([]);
  localStorage.setItem(listKey, storedList);
}

// ===== UPDATE LOCAL_STORAGE LIST
function updateWatchedList(data, listKey) {
  const isListExist = localStorage.getItem(listKey);
  if (!isListExist) {
    createLocalList(listKey);
  }
  const storedList = getLocalStoredList(listKey);
  console.log(storedList);
  storedList.push(data);
  console.log(storedList);
  const updatedList = JSON.stringify(storedList);

  console.log(updatedList);

  localStorage.setItem(listKey, updatedList);
}

// ===== GET LOCAL_STORAGE LIST
function getLocalStoredList(listKey) {
  const stringifyList = localStorage.getItem(listKey);
  return JSON.parse(stringifyList);
}

// ===== OPEN LOCAL LIST
function openWatchedList() {
  headerBtns.addEventListener('click', e => {
    if (e.target.textContent !== 'Watched') return;
    console.log(e.target);
  });
}

function createQueueList() {}
