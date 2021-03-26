import scrapy
from copy import deepcopy
from tutorial.items import TutorialItem
from urllib.parse import urlparse
from bson.objectid import ObjectId
import pymongo
import os

class voaSpider(scrapy.Spider):
  name = "voa"
  

  def __init__(self, id=None, *args, **kwargs):
    super(voaSpider, self).__init__(*args, **kwargs)
    if id is None:
      os.abort()
    client = ""
    if (client == ""):
      client = pymongo.MongoClient('mongodb+srv://admin:1234567890@cluster0.dsauy.mongodb.net/globalnews?retryWrites=true&w=majority')
      mydb = client["globalnews"]
      mycol = mydb["spiderRules"]
      self.rule = mycol.find_one({"_id": ObjectId(id)})
      self.start_urls = [self.rule["start_url"]]
      urlResult = urlparse(self.rule["start_url"])
      self.domain = urlResult.scheme + "://" + urlResult.netloc


  def parse(self, response):
    newsLinks = response.css(self.rule["linksSelector"]).getall()
    startLimit = 0
    limit = self.rule["limit"]
    for newsLink in newsLinks:
      if (startLimit > limit):
        break 
      content_url = self.domain + newsLink
      startLimit += 1
      yield scrapy.Request(url=content_url, callback=self.parse_content)

  def parse_content(self, response):
    newsItem = TutorialItem()
    
    body = response.css(self.rule["contentSelector"]).getall()
    if (body):
      newsItem["title"] = response.css(self.rule["titleSelector"]).get()
      newsItem["picture"] = response.css(self.rule["pictureSelector"]).get()
      newsItem["publicTime"] = response.css(self.rule["publicTimeSelector"]).get().strip()
      newsItem["author"] = response.css(self.rule["authorSelector"]).get().strip()
      newsItem["link"] = response.url
      newsItem["categoryId"] = self.rule["categoryId"]
      content = ''
      i = 0
      for cl in body:
        if (i == 0):
          newsItem["intro"] = str(cl)
        content += str(cl)
        i += 1
      newsItem["content"] = content
      print(newsItem["title"])
      yield newsItem
    