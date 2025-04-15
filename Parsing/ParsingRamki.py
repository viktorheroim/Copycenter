import requests
from bs4 import BeautifulSoup
import os

image_number = 0
link = f'https://algo.by/electronics/multimedia/digital_photo_frame.html?utm_source=yandex_product&utm_medium=cpc&utm_campaign=test_klaviatury_yandex_product&utm_content=auto&utm_term=---autotargeting&yclid=6986430487257415679'

if not os.path.exists('ramki'):
    os.makedirs('ramki')

responce = requests.get(link).text
soup = BeautifulSoup(responce, 'lxml')
all_produсt = soup.find('div', class_='products_list')
product_ramki = all_produсt.find_all('div', class_='product')


for product in product_ramki:
    # Извлекаем название
    name = product.find('div', class_ ='product_header').text.strip()

    # Извлекаем цену
    price = product.find('div', class_ ='current_price').text.strip()

    # Извлекаем ссылку на изображение
    image_url = product.find('img')['data-src']

    # Сохраняем изображение
    image_number += 1
    image_response = requests.get(image_url)

    with open(f'ramki/image{image_number}.jpeg', 'wb') as img_file:
        img_file.write(image_response.content)


    # Печатаем информацию о продукте
    print(f'Название: {name}, Цена: {price}, Изображение сохранено как image{image_number}.jpeg')


