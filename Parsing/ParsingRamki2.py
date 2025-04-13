import requests
from bs4 import BeautifulSoup
import os
import time


image_number = 0
link = 'https://leonardohobby.by/ishop/tree_9538924515/'
api_url = 'http://127.0.0.1:8000/api/productramki/'

if not os.path.exists('ramki2'):
    os.makedirs('ramki2')

try:
    response = requests.get(link)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, 'lxml')
    all_product = soup.find('div', class_='page-content')
    product_ramki = all_product.find_all('div', class_='goods catalog-goods')

    for product in product_ramki:
        name_element = product.find('a', class_='goods__link mb-3')
        name = name_element.text.strip() if name_element else 'Нет названия'

        price_element = product.find('p', class_='price-new')
        price = price_element.text.strip().replace('р.', '').strip() if price_element else 'Нет цены'

        image_element = product.find('img')
        image_url = image_element['data-src'] if image_element else None

        if image_url:
            image_number += 1
            image_response = requests.get(image_url)

            if image_response.status_code == 200:
                image_path = f'ramki2/image{image_number}.jpg'
                with open(image_path, 'wb') as img_file:
                    img_file.write(image_response.content)
                print(f'Название: {name}, Цена: {price}, Изображение сохранено как image{image_number}.jpg')

                # Отправляем данные на API
                product_data = {
                    'name': name,
                    'price': price,
                    'image_url': image_url
                }
                api_response = requests.post(api_url, json=product_data)
                if api_response.status_code == 201:
                    print(f'Продукт {name} успешно сохранён в базе данных.')
                else:
                    print(f'Ошибка при сохранении продукта {name} в базе данных: {api_response.status_code}')
            else:
                print(f'Ошибка при загрузке изображения: {image_url}')
        else:
            print(f'Изображение не найдено для продукта: {name}')

        time.sleep(1)

except requests.RequestException as e:
    print(f'Ошибка при запросе: {e}')