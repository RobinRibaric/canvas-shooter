const canvas = document.querySelector(".canvas");

canvas.width = window.innerWidth; // you can use just inner width
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

const player = new Player(canvas.width / 2, canvas.height / 2, 30, "blue");
//const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', {x: 1, y: 1,});

const projectiles = [];
const enemies = [];

animate()
spawnEnemies();
function animate() {
   
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    player.draw(ctx);

    projectiles.forEach((projectile) => {
        projectile.update(ctx);
    });
    enemies.forEach((enemy, enemyIndex) => {
        enemy.update(ctx);

        projectiles.forEach((projectile, projectileIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            console.log(distance);

            if(distance -enemy.radius - projectile.radius < 1) {
                console.log("collision detected");
                enemies.splice(enemyIndex, 1);
                projectiles.splice(projectileIndex, 1);
            }
        });
    });

}

window.addEventListener("click", (event) => {
    const angle = Math.atan2(event.clientY - canvas.height / 2, event.clientX - canvas.width / 2);
    const velocity = {x: Math.cos(angle), y: Math.sin(angle)};
    const projectile = new Projectile(canvas.width / 2, canvas.height / 2, 5, 'red', velocity);
    projectiles.push(projectile);
});

function spawnEnemies() {
   // setInterval(() => {
        const radius = Math.random() * (30 - 8) + 8;
        let x = 0;
        let y = 0;
        
        console.log("go");
        if(Math.random() < 0.5) {
             x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;//Math.random() * canvas.width;
             y = Math.random() * canvas.height//Math.random() < 0.5 ? 0 - radius :  canvas.height + radius;
        } else {
            x = Math.random() * canvas.width;//Math.random() * canvas.width;
            y = Math.random() < 0.5 ? 0 - radius :  canvas.height + radius;
        }
        
        const color = "yellow";
        const angle = Math.atan2( canvas.height / 2 - y, canvas.width / 2 - x);
        const velocity = {x: Math.cos(angle), y: Math.sin(angle)};
        enemies.push(new Enemy(x, y, radius, color, velocity))
    //}, 1000);
}