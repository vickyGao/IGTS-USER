
$(document).ready(function(){
	dropdownOpen();
});
/**
 * 鼠标划过就展开子菜单，免得需要点击才能展开
 */
function dropdownOpen() {

	var $dropdownLi = $('li.dropdown');

	$dropdownLi.mouseover(function() {
		$(this).addClass('open');

		var $items = $(this).find('> .dropdown-menu > .dropdown-submenu');
		$items.mouseover(function() {
				$(this).addClass('open');
			}).mouseout(function() {
				$(this).removeClass('open');
		});
	}); 
}