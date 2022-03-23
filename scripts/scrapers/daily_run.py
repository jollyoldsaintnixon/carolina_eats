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
        """ 
        looks at each day ahead of input date (default: today)
        subtracts any new items from the daily scrape and then adds them to a new item list and the master csv
        then repickles updated master
        """
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
    
def daily_save(daily_set, date, location, day):
    """ 
    makes a note of new items found on this day as compared to the initial scrape
    saves under db/scraped_data/updates/today+{days after today}/{location}/
    new items are saved as additions.csv
    removed items are saved as deletions.csv
    the whole daily menu is saved as menu.csv
    overwrites the original scraped data as db/scraped_data/{location}/{year}/{month}/{int day}.csv
    finally, it calls compare_sets, passing in the daily scraped set and the paths to the two files to compare
    (compare_sets is what actaully memoizes the additions/deletions)
    """
    day_path = f"today+{day}"

    path = SCRAPE_PATH + f"updates/{day_path}/{location}/"
    try: 
        if os.path.isdir(path):
            shutil.rmtree(path)
        Path(path).mkdir(parents=True, exist_ok=True)
    except OSError as e:
        print(f"error: {path} : {e.strerror}")

    with open(path + "menu.csv", "w") as file:
        """ 
        the whole daily menu is 
        saved as menu.csv. saves under db/scraped_data/updates/today+{days after today}/{location}/ 
        """
        writer = DictWriter(file, fieldnames=MENU_HEADERS)
        writer.writeheader()
        for item in daily_set:
            make_row(item, writer)

    compare_path = SCRAPE_PATH + f"{location}/{date.year}/{date.month}/{date.day}"

    with open(compare_path + f".csv", "w") as file:
        """ overwrites the original scraped data as db/scraped_data/{location}/{year}/{month}/{int day}.csv """
        writer = DictWriter(file, fieldnames=MENU_HEADERS)
        writer.writeheader()
        for item in daily_set:
            make_row(item, writer)
    compare_sets(daily_set, path, compare_path)

def compare_sets(daily_set, original_path, compare_path):
    """     
    new items are saved as additions.csv
    removed items are saved as deletions.csv
    """
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
    """ 
    adds any new items to db/scraped_data/new_items.csv
    saves the category and item name (these will be used to updated the master list, after all)
    
    also does a second thing (should make this two methods):
    it updates teh master csv with the new items.
    """
    file_name = SCRAPE_PATH + "new_items.csv" #saving new additions in new file
    with open(file_name, "a") as file:
        writer = DictWriter(file, fieldnames=MASTER_HEADERS)
        if os.stat(file_name).st_size == 0:
            """ if this is a brand new file, write the headers first  """
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
