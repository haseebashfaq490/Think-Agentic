from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

url = "https://thinkagentic-lab.streamlit.app/"

options = webdriver.ChromeOptions()
options.add_argument("--headless")
driver = webdriver.Chrome(options=options)

try:
    driver.get(url)
    wait = WebDriverWait(driver, 15)
    
    try:
        button = wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(), 'Yes, get this app back up')]")))
        button.click()
        print("Woke the app up successfully.")
    except:
        print("App is already awake.")
finally:
    driver.quit()
