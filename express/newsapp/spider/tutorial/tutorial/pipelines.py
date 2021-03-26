# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo
import time
from dateutil import parser

class TutorialPipeline:
    def __init__(self):
        client = ""
        if (client == ""):
            client = pymongo.MongoClient('mongodb+srv://admin:1234567890@cluster0.dsauy.mongodb.net/globalnews?retryWrites=true&w=majority')
            self.mydb = client["globalnews"]
            self.mycol = self.mydb["news"]
            print("connect 1 time")
        else:
            print("1 time")

    def process_item(self, item, spider):
        data = {
            "title": item["title"],
            "intro": item["intro"],
            "picture": item["picture"],
            "content": item["content"],
            "active": False,
            "tags": [],
            "priority":[4],
            "author": item["author"],
            "categoryId": item["categoryId"],
            "link": item["link"],
            "publicTime": item["publicTime"],
            "insertTime": parser.parse(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))

        }
        self.mycol.insert_one(data)
        return item

    def close_spider(self, spider):
        pass
