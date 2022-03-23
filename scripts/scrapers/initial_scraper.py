from csv import DictWriter
import datetime
import os
import pickle
import sys
from pathlib import Path
from scraper_helpers import (LOCATIONS, STARTING_DIRECTORY, MENU_HEADERS, PICKLE_FILE_NAME, SCRAPE_PATH,
get_html, make_soup, get_menu_items, make_row, write_master,
get_master_pickle, update_master, repickle)


def scraper():
    os.chdir(STARTING_DIRECTORY)
    sys_args = sys.argv # the first arg should be the desired start date. default is jan 1, 2022
                        # second arg should be how many days to scrape out from the start date. default is 150
    start_date = "2022-01-25"
    if len(sys_args) > 1:
        try:
            start_date = sys_args[1]
            d = datetime.date.fromisoformat(start_date)
        except: 
            print(f"start date invalid.  using {start_date}.")
    else:
        d = datetime.date.fromisoformat(start_date)
    print(f"start date is {start_date}")
    master = get_master_pickle(PICKLE_FILE_NAME)
    Path(SCRAPE_PATH).mkdir(parents=True, exist_ok=True)

    span_days = 150
    if len(sys_args) > 2: # default span is 150 days. can enter an in as a second cmd line arg for span
        try: 
            span_days = int(sys_args[2])
            print(f"range is {span_days}")
        except:
            print(f"range invalid.  using {span_days}.")
    print("span_days: ", span_days)
    
    for day in range(span_days):
        for l in LOCATIONS:
            print("isoformat", d.isoformat())
            url = f"https://dining.unc.edu/locations/{l}/?date={d.isoformat()}"
            html = get_html(url)
            soup = make_soup(html)
            master_additions, daily_set = get_menu_items(soup, l, d)
            save_menu_items(daily_set, d, l)
            master = update_master(master_additions, master) # do we really need to have the master equal to the result?
            print(f"length of master at {d.isoformat}: {len(master)}")
        d += datetime.timedelta(days=1)
    
    # for item in master:
    #     print(item)
    write_master(master, SCRAPE_PATH + "master_menu.csv")
    repickle(master, PICKLE_FILE_NAME)


def save_menu_items(daily_set, date, location):
    """ 
    saves the menu items served on a particular day in db/scraped_data/{location}/{year}/{month}/{integer of day}.csv
    saved as csv with headers of: yyyy-mm-dd | location | meal | category | item name
    also makes a pickle in the save directory as {integer of day}.pickle
    """
    path = f"{location}/{date.year}/{date.month}"
    path = SCRAPE_PATH + path
    Path(path).mkdir(parents=True, exist_ok=True)
    path += f"/{date.day}"
    with open(path + ".csv", "w") as file:
        writer = DictWriter(file, fieldnames=MENU_HEADERS)
        writer.writeheader()
        for item in daily_set:
            make_row(item, writer)
    
    path += "-pickle"
    with open(path + ".pickle", "wb") as file:
        pickle.dump(daily_set, file)


scraper()