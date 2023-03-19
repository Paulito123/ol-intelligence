from typing import AnyStr
from datetime import datetime
from src.db.model import AccountBalance
from asyncio import create_task, sleep, gather
from aiohttp import ClientSession, ClientTimeout, ClientConnectorError
from config import Config


async def get_balances_as(account_type:AnyStr, max_retries=1) -> None:
    print(f"[{datetime.now()}]:INFO:Get balances for {account_type}")

    # exit if max_retries is reached
    if max_retries == 0:
        print(f'[{datetime.now()}]:INFO:Max retries for get_balances({account_type}) reached, exiting loop.')
        return

    # define timeout
    session_timeout = ClientTimeout(total=None,sock_connect=300,sock_read=300)
    async with ClientSession(timeout=session_timeout) as session:
        try:
            # Get data
            api_url = f"{Config.BASE_API_URI}:444/balances?account_type={account_type}"
            async with session.get(api_url) as response:
                # Raise an exception if the response is not 2xx
                response.raise_for_status()
                data = response.json()

                # Process the response
                if data and len(data) > 0:
                    AccountBalance.upload_balances(data)
                
        except ClientConnectorError as e:
            # Handle the error and retry the API call after 5 seconds
            print(f'[{datetime.now()}]:ERROR:get_balances({account_type}) failed: {e}')
            await sleep(5)
            max_retries -= 1
            await get_balances_as(account_type, max_retries)

        except Exception as e:
            # Handle the error and retry the API call after 5 seconds
            print(f'[{datetime.now()}]:ERROR:get_balances({account_type}) failed: {e}')
            await sleep(5)
            max_retries -= 1
            await get_balances_as(account_type, max_retries)


async def run_get_balances_tasks() -> None:
    tasks = [create_task(get_balances_as(account_type)) for account_type in Config.ACCOUNT_TYPES]
    await gather(*tasks)
