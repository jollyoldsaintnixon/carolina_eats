from bs4 import BeautifulSoup
import pickle
import os
import requests
from csv import DictWriter

LOCATIONS = ["chase", "top-of-lenoir"]
STARTING_DIRECTORY = "/home/josn/apps/secondChance/carolina_eats"
SCRAPE_PATH = "db/scraped_data/"
PICKLE_FILE_NAME = SCRAPE_PATH + "master.pickle"
MENU_HEADERS = ["date", "location", "meal", "category", "name"]
MASTER_HEADERS = ["category", "name"]
WEEKDAYS = {
    0: "monday",
    1: 'tuesday',
    2: 'wednesday',
    3: 'thursday',
    4: 'friday',
    5: 'saturday',
    6: 'sunday'
}
SKIPPED_CATEGORIES = [
    "Condiments and Spreads",
    "Assorted Breads",
    "Cereal",
    "Deli",
    "Beverages",
    "Salad Bar",
]

def get_html(url):
    response = requests.get(url)
    page_html = response.text
    return page_html

def save_html(html, path):
    with open("dining_menu.html", "w") as file:
        file.write(html)

def make_soup(html):
    return BeautifulSoup(html, "html.parser")

def get_menu_items(soup, location, date):
    tabs = soup.select(".c-tab") # makes an array based off of elements in the html soup with .c-tab class
    master_set = set()
    daily_set = set()
    try:
        for idx, tab in enumerate(tabs):
            mealtime_link = soup.find(attrs={"data-tabid": f"{idx}"})
            mealtime = mealtime_link.find("div").get_text().strip()
            categories = tab.select(".toggle-menu-station-data")
            for category in categories:
                sib = category.find_next_sibling()
                if sib is not None:
                    category_name = category.get_text().strip()
                    if not category_name in SKIPPED_CATEGORIES:
                        list_items = sib.select("li")
                        for li in list_items:
                            # li_link = li.findChildren("a" , recursive=False) # attempting to get class names of element in order to determine what dietary restrictions to add
                            # for klass in li_link['class']:
                            #     print(klass)
                            master_info = (category_name, li.get_text().strip())
                            daily_info = (date.isoformat(), location, mealtime, category_name, li.get_text().strip())
                            master_set.add(master_info)
                            daily_set.add(daily_info)
    except Exception:
        pass
    return master_set, daily_set


def get_master_pickle(file_name):
    if os.path.exists(file_name):
        with open(file_name, "rb") as file:
            master = pickle.load(file)
    else: 
        master = set()
        # with open(file_name, "wb") as file:
            # pickle.dump(master, file)
            # pass
    return master

def update_master(menu_items, master):
    # file_name = "master_list.csv"
    for item in menu_items:
        master.add(item)
    return master

def write_master(master, file_name):
    with open(file_name, "w") as file:
        writer = DictWriter(file, fieldnames=MASTER_HEADERS)
        writer.writeheader()
        for item in master:
            make_row(item, writer)

def repickle(master, file_name):
    with open(file_name, "wb") as file:
        pickle.dump(master, file)

def make_row(item, writer):
    row = {}
    for idx, h in enumerate(writer.fieldnames):
        row[h] = item[idx]
    # print("row", row)
    writer.writerow(row)