import { Observable } from 'rxjs'
import { createTodoItem, mockHttpPost } from './lib'
import './index0'

if (module.hot) {
  module.hot.accept()
}

function a (id: string) {
  return id
}
const b = a('3')
const $input = <HTMLInputElement>document.querySelector('.todo-val')
const $list = <HTMLUListElement>document.querySelector('.list-group')
const $add = document.querySelector('.button-add')

const enter$ = Observable.fromEvent<KeyboardEvent>($input, 'keydown')
  .filter(r => r.keyCode === 13)

const clickAdd$ = Observable.fromEvent<MouseEvent>($add, 'click')

const input$ = enter$.merge(clickAdd$)

const item$ = input$
  .map(() => $input.value)
  .filter(r => r !== '')
  .switchMap(mockHttpPost)
  .map(createTodoItem)
  .do(ele => {
    $list.appendChild(ele)
    $input.value = ''
  })
  .publishReplay(1)
  .refCount()
console.log('df')
const toggle$ = item$
  .mergeMap($todoItem => {
    return Observable.fromEvent<MouseEvent>($todoItem, 'click')
      .filter(e => e.target === $todoItem)
      .mapTo($todoItem)
  })
  .do(($todoItem: HTMLElement) => {
    if ($todoItem.classList.contains('done')) {
      $todoItem.classList.remove('done')
    } else {
      $todoItem.classList.add('done')
    }
  })

const remove$ = item$
  .mergeMap($todoItem => {
    const $removeButton = $todoItem.querySelector('.button-remove')
    return Observable.fromEvent($removeButton, 'click')
      .mapTo($todoItem)
  })
  .do(($todoItem: HTMLElement) => {
    // 从 DOM 上移掉 todo item
    const $parent = $todoItem.parentNode
    $parent.removeChild($todoItem)
  })

const app$ = toggle$.merge(remove$)
  .do(r => console.log(r))
app$.subscribe()
