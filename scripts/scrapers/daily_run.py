from csv import DictWriter, DictReader
import datetime, os, pickle, shutil, sys
from pathlib import Path
from scraper_helpers import (LOCATIONS, STARTING_DIRECTORY, MENU_HEADERS, MASTER_HEADERS, 
PICKLE_FILE_NAME, WEEKDAYS, SCRAPE_PATH,
get_html, make_soup, get_menu_items, make_row, get_master_pickle, update_master, repickle)

def daily_scraper():
    os.chdir(STARTING_DIRECTORY) # should now work from anywhere
    # today = datetime.date.today()
    # d = datetime.date.today()
    # today = datetime.date.today() - datetime.timedelta(days=23)
    date = datetime.date.today()
    
    if len(sys.argv) > 1: #pretty much, you can set the number of days to go back in the past from the command line
        try:
            days = int(sys.argv[1])
            date = datetime.date.today() - datetime.timedelta(days=days)
        except:
            print(f"start date invalid.  using {date} instead")
    print(date)
    master = get_master_pickle(PICKLE_FILE_NAME)
    Path(SCRAPE_PATH).mkdir(parents=True, exist_ok=True)
    for day in range(7):
        for l in LOCATIONS:
            url = f"https://dining.unc.edu/locations/{l}/?date={date.isoformat()}"
            html = get_html(url)
            soup = make_soup(html)
            master_additions, daily_set = get_menu_items(soup, l, date)
            memoize_master_additions(master_additions - master) # only input what the master doesn't already have
            daily_save(daily_set, date, l, day)
            master = update_master(master_additions, master)
        date += datetime.timedelta(days=1)

    repickle(master, PICKLE_FILE_NAME)

0
def daily_save(daily_set, date, location, day):
    # delta = date - today
    # day_path = f"next_{WEEKDAYS[date.weekday()]}"
    # if delta == datetime.timedelta(days=0):
    #     day_path = 'today'
    # elif delta == datetime.timedelta(days=1):
    #     day_path = 'tomorrow'
    # path = SCRAPE_PATH + f"updates/{day_path}/{location}/"
    day_path = f"today+{day}"

    path = SCRAPE_PATH + f"updates/{day_path}/{location}/"
    try: 
        if os.path.isdir(path):
            shutil.rmtree(path)
        Path(path).mkdir(parents=True, exist_ok=True)
    except OSError as e:
        print(f"error: {path} : {e.strerror}")

    with open(path + "menu.csv", "w") as file:
        writer = DictWriter(file, fieldnames=MENU_HEADERS)
        writer.writeheader()
        for item in daily_set:
            make_row(item, writer)

    compare_path = SCRAPE_PATH + f"{location}/{date.year}/{date.month}/{date.day}"

    with open(compare_path + f".csv", "w") as file:
        writer = DictWriter(file, fieldnames=MENU_HEADERS)
        writer.writeheader()
        for item in daily_set:
            make_row(item, writer)

    compare_sets(daily_set, path, compare_path)

def compare_sets(daily_set, original_path, compare_path):
    compare_pickle = compare_path + "-pickle.pickle"
    with open(compare_pickle, "rb") as file:
        old_set = pickle.load(file)
    
    added_items = daily_set - old_set
    missing_items = old_set - daily_set

    with open(original_path + f"additions.csv", "w") as add_file:
        add_writer = DictWriter(add_file, fieldnames=MENU_HEADERS)
        add_writer.writeheader()
        for item in added_items:
            make_row(item, add_writer)

    with open(original_path + f"deletions.csv", "w") as del_file:
        del_writer = DictWriter(del_file, fieldnames=MENU_HEADERS)
        del_writer.writeheader()
        for item in missing_items:
            make_row(item, del_writer)

    with open(compare_pickle, "wb") as file:
        pickle.dump(daily_set, file)

def memoize_master_additions(master_additions):
    file_name = SCRAPE_PATH + "new_items.csv" #saving new additions in new file
    with open(file_name, "a") as file:
        writer = DictWriter(file, fieldnames=MASTER_HEADERS)
        if os.stat(file_name).st_size == 0:
            writer.writeheader()
        for item in master_additions:
            make_row(item, writer)

    file_name = SCRAPE_PATH + "master_menu.csv" # adding new additions to existing master.csv
    with open(file_name, "a") as file:
        writer = DictWriter(file, fieldnames=MASTER_HEADERS)
        if os.stat(file_name).st_size == 0:
            writer.writeheader()
        for item in master_additions:
            make_row(item, writer)
        


daily_scraper()
