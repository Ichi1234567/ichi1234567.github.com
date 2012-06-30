# encoding: utf-8
# Modified by KenJ(@denjones) 2012-3-20
# Add Unicode support to the category
# See category_generator.rb
#
# place this file in your plugins directory and add the tag to your sidebar
#$ cat source/_includes/asides/categories.html
#<section>
# <h1>Categories</h1>
# <ul id="categories">
# {% category_list %}
# </ul>
#</section>

module Jekyll
  class CategoryListTag < Liquid::Tag
    def render(context)
      html = ""
      categories = context.registers[:site].categories.keys
      categories.sort.each do |category|
        posts_in_category = context.registers[:site].categories[category].size
        html << "<li class='category'><a href='/blog/categories/#{category[/(?<={)[^}]*/]}/'>#{category[/[^{]*/]} (#{posts_in_category})</a></li>\n"
      end
      html
    end
  end
end

module Jekyll
  class CategoryCloudTag < Liquid::Tag
  
    def initialize(tag_name, markup, tokens)
      @opts = {}
      if markup.strip =~ /\s*counter:(\w+)/i
        @opts['counter'] = ($1 == 'true')
        markup = markup.strip.sub(/counter:\w+/i,'')
      end
      super
    end

    def render(context)
      lists = {}
      max, min = 1, 1
      config = context.registers[:site].config
      category_dir = config['root'] + config['category_dir'] + '/'
      categories = context.registers[:site].categories
	  categories.keys.sort_by{ |str| str.downcase }.each do |category|
        count = categories[category].count
        lists[category] = count
		max = count if count > max
      end

      html = ''
      lists.each do | category, counter |
        style = "font-size: #{100 + (60 * Float(counter)/max)}%"
		posts_in_category = context.registers[:site].categories[category].size
        html << "<a href='/blog/categories/#{category[/(?<={)[^}]*/]}/' style='#{style}'>#{category[/[^{]*/]}"
        if @opts['counter']
          html << "(#{categories[category].count})"
        end
        html << "</a> "
      end
      html
    end
  end
end

Liquid::Template.register_tag('category_sidebar', Jekyll::CategoryListTag)
Liquid::Template.register_tag('category_cloud_sidebar', Jekyll::CategoryCloudTag)