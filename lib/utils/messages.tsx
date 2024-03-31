const exampleMessages = [
  {
    heading: 'List queued actions',
    message: 'List queued actions',
  },
  {
    heading: 'Send Telegram notification',
    message: 'Send Telegram notification',
  },
  {
    heading: 'Schedule email/newsletter',
    message: 'Schedule email/newsletter',
  },
  {
    heading: 'Deploy new token contract',
    message: 'Deploy new token contract',
  },
  {
    heading: 'Mint tokens with delay',
    message: 'Mint tokens with delay',
  },
];

export type Shortcut = {
  heading: string;
  message: string;
};

export const getShortcutsFromLocalStorage = () => {
  const shortcuts = localStorage.getItem('ai-home-shortcuts');
  return shortcuts ? JSON.parse(shortcuts) : exampleMessages;
};

export const saveShortcutsToLocalStorage = (shortcuts: Shortcut[]) => {
  localStorage.setItem('ai-home-shortcuts', JSON.stringify(shortcuts));
};
