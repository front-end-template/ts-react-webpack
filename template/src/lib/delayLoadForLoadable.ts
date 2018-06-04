const delayLoad = delay => (loader): Promise<any> => new Promise(resolve => {
  setTimeout(() => resolve(loader()), delay)
})

export default delayLoad

