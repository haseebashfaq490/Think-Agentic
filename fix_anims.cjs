const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the Proven Impact stats to use animated counter logic
html = html.replace(/<h3 style="font-size: 3.5rem; color: var\(--accent\); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;">70%<\/h3>/,
  '<h3 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;"><span class="impact-counter" data-target="70" data-suffix="%">0%</span></h3>');

html = html.replace(/<h3 style="font-size: 3.5rem; color: var\(--accent\); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;">4x<\/h3>/,
  '<h3 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;"><span class="impact-counter" data-target="4" data-suffix="x">0x</span></h3>');

html = html.replace(/<h3 style="font-size: 3.5rem; color: var\(--accent\); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;">85%<\/h3>/,
  '<h3 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;"><span class="impact-counter" data-target="85" data-suffix="%">0%</span></h3>');

html = html.replace(/<h3 style="font-size: 3.5rem; color: var\(--accent\); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;">60h<\/h3>/,
  '<h3 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;"><span class="impact-counter" data-target="60" data-suffix="h">0h</span></h3>');

html = html.replace(/<h3 style="font-size: 3.5rem; color: var\(--accent\); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;">99%<\/h3>/,
  '<h3 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;"><span class="impact-counter" data-target="99" data-suffix="%">0%</span></h3>');

html = html.replace(/<h3 style="font-size: 3.5rem; color: var\(--accent\); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;">10k\+<\/h3>/,
  '<h3 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;"><span class="impact-counter" data-target="10" data-suffix="k+">0k+</span></h3>');

html = html.replace(/<h3 style="font-size: 3.5rem; color: var\(--accent\); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;">50%<\/h3>/,
  '<h3 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;"><span class="impact-counter" data-target="50" data-suffix="%">0%</span></h3>');

html = html.replace(/<h3 style="font-size: 3.5rem; color: var\(--accent\); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;">92%<\/h3>/,
  '<h3 style="font-size: 3.5rem; color: var(--accent); margin-bottom: 0.25rem; font-weight: 700; line-height: 1;"><span class="impact-counter" data-target="92" data-suffix="%">0%</span></h3>');

// 2. Fix the ROI and counters formatting and logical suffix
html = html.replace(/<h4 class="counter" data-target="95">0<\/h4>/, '<h4 class="counter" data-target="95" data-suffix="%">0</h4>');
html = html.replace(/<h4 class="counter" data-target="10">0<\/h4>/, '<h4 class="counter" data-target="10" data-suffix="x">0</h4>');
html = html.replace(/<span class="counter" data-target="600">0<\/span>K\+<\/h4>/, '<span class="counter" data-target="600" data-suffix="K+">0</span></h4>');
html = html.replace(/<h4 class="counter" data-target="200">0<\/h4>/, '<h4 class="counter" data-target="200" data-suffix="+">0</h4>');

// Replacing the JS logic for standard counters
html = html.replace("counter.innerText = Math.ceil(count) + (target === 95 ? '%' : target === 10 ? 'x' : target === 50 ? 'K+' : '+');", "counter.innerText = Math.ceil(count) + (counter.getAttribute('data-suffix') || '');");
html = html.replace("counter.innerText = target + (target === 95 ? '%' : target === 10 ? 'x' : target === 50 ? 'K+' : '+');", "counter.innerText = target + (counter.getAttribute('data-suffix') || '');");

// 3. Bring back Impact Counters hover JS
const hoverJs = `
      // Impact Counters on Hover
      const impactCards = document.querySelectorAll('#proven-impact .impact-card');
      impactCards.forEach(card => {
        const counterEl = card.querySelector('.impact-counter');
        if (counterEl) {
          const target = +counterEl.getAttribute('data-target');
          const suffix = counterEl.getAttribute('data-suffix');
          
          card.addEventListener('mouseenter', () => {
            let count = 0;
            const impactSpeed = 30; // Faster animation for hover
            const increment = target / impactSpeed;
            
            const updateImpactCount = () => {
              if (count < target) {
                count += increment;
                counterEl.innerText = Math.ceil(count) + suffix;
                requestAnimationFrame(updateImpactCount);
              } else {
                counterEl.innerText = target + suffix;
              }
            };
            updateImpactCount();
          });
        }
      });
`;

// Inject hover js
if (html.includes('// Reveal Animations on Scroll')) {
  html = html.replace('// Reveal Animations on Scroll', hoverJs + '\n\n      // Reveal Animations on Scroll');
} else {
  console.log("Could not find Reveal Animations on Scroll tag.");
}

fs.writeFileSync('index.html', html);
console.log('Fixed animations');
