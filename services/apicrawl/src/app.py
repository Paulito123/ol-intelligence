from time import sleep
from datetime import datetime, timedelta
from asyncio import get_event_loop
from config import Config

from src.balances import run_get_balances_tasks


if __name__ == "__main__":
    last_trigger_5_mins = datetime.now() - timedelta(minutes=5.01)
    last_trigger_hour = datetime.now() - timedelta(hours=1.01)
    last_trigger_day = datetime.now() - timedelta(days=1.01)
    last_trigger_half_day = datetime.now() - timedelta(days=0.51)
    loop = get_event_loop()
    while True:
        # sync start time
        start_cycle = datetime.now()

        # TRIGGET EVERY CYCLE
        ...

        # TRIGGER EVERY 5 MINUTES
        if last_trigger_5_mins <= datetime.now() - timedelta(minutes=5):
            last_trigger_5_mins = start_cycle

        # TRIGGER EVERY HOUR
        if last_trigger_hour <= datetime.now() - timedelta(hours=1):
            last_trigger_hour = start_cycle
        
        # TRIGGER EVERY HALF DAY
        if last_trigger_half_day <= datetime.now() - timedelta(days=0.5):
            loop.run_until_complete(run_get_balances_tasks())
            last_trigger_half_day = start_cycle
        
        # TRIGGER EVERY DAY
        if last_trigger_day <= datetime.now() - timedelta(days=1):
            last_trigger_day = start_cycle
        
        # sync end time
        end_cycle = datetime.now()

        # calculate sleepy time
        secs_between = int((end_cycle - start_cycle).total_seconds())
        if secs_between < Config.SYNC_INTERVAL:
            sleepytime = Config.SYNC_INTERVAL - secs_between
            sleep(sleepytime)
