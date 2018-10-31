<div id="sidebar_container">
	<h3 class="search">Search</h3>
	<form id="search_form" method="post" action="<?php echo $this->config->item('base_url')?>items/do_search">
		<p><input type="text" name="query" class="text_input" value="<?php if (isset($query)): echo $query; endif;?>" /> <input type="submit" value="Search" /></p>
	</form>
	<h3>Popular Tags</h3>
	<ul class="tag_list">
	<?php foreach($popular_tags as $tag): ?>
		<li><a href="<?php echo $this->config->item('base_url')?>items/tag/<?php echo $tag->slug?>"><?php echo $tag->name?></a></li>
	<?php endforeach; ?>
	</ul>
</div>