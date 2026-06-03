
export const handleTime = () => {

const time: string[] = [];

for(let i = 540; i <= 1080; i += 30){
    const hours = String(Math.floor(i / 60)).padStart(2, '0');
    const minutes = String(i % 60).padStart(2, '0');
    time.push(`${hours} : ${minutes}`);
}

return time;
}