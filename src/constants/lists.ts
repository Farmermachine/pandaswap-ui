// used to mark unsupported tokens, these are hosted lists of unsupported tokens

const PANCAKES_LIST = 'https://gateway.pinata.cloud/ipfs/QmdKy1K5TMzSHncLzUXUJdvKi1tHRmJocDRfmCXxW5mshS'

export const UNSUPPORTED_LIST_URLS: string[] = [PANCAKES_LIST]

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  PANCAKES_LIST // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
