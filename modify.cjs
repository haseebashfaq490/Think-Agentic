const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Move "Why Think Agentic" Above "Process"
const aboutSectionRegex = /<!-- About -->(.|\n)*?<\/section>\n/g;
let aboutSectionMatch = html.match(aboutSectionRegex);
if (aboutSectionMatch) {
  const aboutSectionStr = aboutSectionMatch[0];
  html = html.replace(aboutSectionStr, '');
  html = html.replace('<!-- Process -->', aboutSectionStr + '\n      <!-- Process -->');
}

// 2. Move "Reviews Section" into tab-home, right before </div> <!-- End tab-home --> (or similar)
const reviewSectionRegex = /<!-- Reviews Section -->(.|\n)*?<\/section>\n/g;
let reviewSectionMatch = html.match(reviewSectionRegex);
if (reviewSectionMatch) {
  const reviewSectionStr = reviewSectionMatch[0];
  html = html.replace(reviewSectionStr, '');
  // tab-home ends at </div> <!-- end tab-home -->. Let's find it.
  html = html.replace('      </div> <!-- end tab-home', reviewSectionStr + '\n      </div> <!-- end tab-home');
  html = html.replace('      </div>\n\n      <!-- Services Tab -->', reviewSectionStr + '\n      </div>\n\n      <!-- Services Tab -->');
}

// 3. Add Stock Prediction business case
const stockPredictionHTML = `
              <!-- Case 0: Stock Prediction Agent -->
              <div class="case-card reveal" style="background: var(--glass); border: 1px solid var(--border); border-radius: 1.5rem; padding: 3rem;">
                <h3 style="font-size: 2rem; color: var(--accent); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem;">
                  <i data-lucide="trending-up" style="width: 32px; height: 32px;"></i>
                  Autonomous Stock Prediction Agent
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                  <div>
                    <h4 style="color: white; margin-bottom: 0.5rem; font-size: 1.1rem;">The Challenge</h4>
                    <p style="color: var(--text-gray);">Financial analysts were overwhelmed by the sheer volume of market news, earnings reports, and technical indicators. Critical trading opportunities were frequently missed because human teams couldn't synthesize the data fast enough.</p>
                  </div>
                  <div>
                    <h4 style="color: white; margin-bottom: 0.5rem; font-size: 1.1rem;">The Agentic Solution</h4>
                    <p style="color: var(--text-gray);">A multi-modal intelligence agent that continuously ingests live stock tickers, macro-economic feeds, and sentiment analysis. It autonomously evaluates technical models and dispatches real-time buy/sell recommendations with confidence scores directly to the trading desk via webhook or email.</p>
                  </div>
                </div>

                <div class="flow-diagram-container">
                  <div class="flow-split">
                    <div class="flow-node">
                      <div class="flow-icon"><i data-lucide="line-chart"></i></div>
                      <div class="flow-title">Market APIs</div>
                      <div class="flow-sub">Live Price Data</div>
                    </div>
                    <div class="flow-node">
                      <div class="flow-icon"><i data-lucide="newspaper"></i></div>
                      <div class="flow-title">News Feeds</div>
                      <div class="flow-sub">Global Sentiment</div>
                    </div>
                  </div>
                  <div class="flow-arrow"><i data-lucide="arrow-right"></i></div>
                  
                  <div class="flow-node highlight">
                    <div class="flow-icon"><i data-lucide="brain-circuit"></i></div>
                    <div class="flow-title">Analysis Agent</div>
                    <div class="flow-sub">Execute ML Models</div>
                  </div>
                  <div class="flow-arrow"><i data-lucide="arrow-right"></i></div>
                  
                  <div class="flow-node">
                    <div class="flow-icon"><i data-lucide="scales"></i></div>
                    <div class="flow-title">Risk Evaluator</div>
                    <div class="flow-sub">Validate Strategy</div>
                  </div>
                  <div class="flow-arrow"><i data-lucide="arrow-right"></i></div>
                  
                  <div class="flow-node highlight">
                    <div class="flow-icon"><i data-lucide="bell-ring"></i></div>
                    <div class="flow-title">Trade Alert</div>
                    <div class="flow-sub">Buy/Sell Update</div>
                  </div>
                </div>
              </div>
`;
html = html.replace('<!-- Case 1: Insurance Claim -->', stockPredictionHTML + '\n              <!-- Case 1: Insurance Claim -->');

fs.writeFileSync('index.html', html);
console.log("Transformations complete");
