$(function() {

	function rating_check(ID) {
		if (typeof(Cookies) == "undefined") {
			return false;
		}

		if (typeof(Base64) == "undefined") {
			return false;
		}

		var dataCookie = Cookies.get("globalRatings");

		if (dataCookie!=null) {

			dataCookie = dataCookie.split("|");

			for(var i = 0; i < dataCookie.length; i++) {
				if (dataCookie[i] == ID) {
					return false;
				}
			}
		}

		return true;
	}

	$('.shows_votes').each(function() {
		if (rating_check($(this).attr('rel'))) {
			$('.shows_votes-rating .star', this).click(function(e) {
				$.ajax({
					//url: 'http://www-int.czech-tv.cz' + $(this).attr('href') + '&time=' + new Date().getTime(),
					//url: 'http://www.ceskatelevize.cz' + $(this).attr('href') + '&time=' + new Date().getTime(),
					url: $(this).attr('href') + '&time=' + new Date().getTime(),
					dataType: 'json',
					invokedata: $(this).parent().parent(),
					success: function(data) {
						regexp = /(\d+)%/m;
						percent = regexp.exec(data.html);

						$('.shows_votes-title span', this.invokedata).html(parseInt($('.shows_votes-title span', this.invokedata).html()) + 1);
						$('.shows_votes-rating .star', this.invokedata).removeClass('star').removeClass('is-active').addClass('star-inactive').unbind('click').click(function(e) {e.preventDefault();});
						$('.shows_votes-rating .star-inactive:eq(' + (5 - Math.round(percent[1] / 20)) + ')', this.invokedata).addClass('is-active');
					}
				});
				e.preventDefault();
			});
		} else {
			$('.shows_votes-rating .star', this).removeClass('star').addClass('star-inactive').unbind('click').click(function(e) {e.preventDefault();});
		}
	});

});