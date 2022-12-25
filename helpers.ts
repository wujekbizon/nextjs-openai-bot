export const generateUniqueId = () => {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
};

export const typeText = (element: HTMLElement, text: string) => {
  let index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
};

export const chatStripe = (
  isAi: boolean,
  value: FormDataEntryValue | null,
  uniqueId: string
) => {
  return `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
          <div class="profile">
              <img 
                src=${isAi ? '/bot.svg' : '/user.svg'} 
                alt="${isAi ? 'bot' : 'user'}" 
              />
          </div>
          <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div>
    `;
};
