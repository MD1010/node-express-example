export const runAsyncWrapper = (callback: any) => {
    return (req: any, res: any, next: any) => {
      callback(req, res, next)
        .catch(next)
    }
  }