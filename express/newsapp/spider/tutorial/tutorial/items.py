# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class TutorialItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    picture = scrapy.Field()
    intro = scrapy.Field()
    content = scrapy.Field()
    author = scrapy.Field()
    publicTime = scrapy.Field()
    link = scrapy.Field()
    categoryId = scrapy.Field()
