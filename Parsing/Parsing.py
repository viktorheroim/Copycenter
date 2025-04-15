import requests
from bs4 import BeautifulSoup
import fake_useragent

user = fake_useragent.UserAgent().random

header = {'User-Agent': user}

url = 'https://browser-info.ru/'
responce = requests.get(url, headers=header).text
soup = BeautifulSoup(responce, 'lxml')

block = soup.find('div', id='tool_padding')

check_js = block.find('div', id='javascript_check')
status_js = check_js.find_all('span')[1].text
result_js = f'Javascript: {status_js}'

check_flash = block.find('div', id='flash_version')
status_flash = check_flash.find_all('span')[1].text
result_flash = f'Flash: {status_flash}'

check_user = block.find('div', id='user_agent').text

print(result_js)
print(result_flash)
print(check_user)
