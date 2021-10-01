import 'src/style/main.css'; // absolute import
import styles from './style/local.css'; // Local scoped CSS (Using CSS modules) // Relative import

// Your scripting here
document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#root').innerHTML = `Hello world
        <div class="${styles.locallyScoped}">
            I am locally scoped styled
        </div>
    `;
});
