/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Sortable) {
  Drupal.behaviors.MediaLibraryWidgetSortable = {
    attach: function attach(context) {
      var selection = context.querySelectorAll('.js-media-library-selection');
      selection.forEach(function (widget) {
        Sortable.create(widget, {
          draggable: '.js-media-library-item',
          handle: '.js-media-library-item-preview',
          onEnd: function onEnd() {
            $(widget).children().each(function (index, child) {
              $(child).find('.js-media-library-item-weight').val(index);
            });
          }
        });
      });
    }
  };

  Drupal.behaviors.MediaLibraryWidgetToggleWeight = {
    attach: function attach(context) {
      var strings = {
        show: Drupal.t('Show media item weights'),
        hide: Drupal.t('Hide media item weights')
      };
      $('.js-media-library-widget-toggle-weight', context).once('media-library-toggle').on('click', function (e) {
        e.preventDefault();
        $(e.currentTarget).toggleClass('active').text($(e.currentTarget).hasClass('active') ? strings.hide : strings.show).closest('.js-media-library-widget').find('.js-media-library-item-weight').parent().toggle();
      }).text(strings.show);
      $('.js-media-library-item-weight', context).once('media-library-toggle').parent().hide();
    }
  };

  Drupal.behaviors.MediaLibraryWidgetEditItem = {
    attach: function attach() {
      $('.media-library-widget .edit-media')
        .once('media-library-edit')
        .on('click',function(){
          // Remove any "selected-media" classes.
          $(this).parent().parent().find('selected-media').removeClass('selected-media');
          // Mark the media item as selected to render it properly when submitting an ajax media edit request.
          $(this).parent().find('article').addClass('selected-media');
        })
    },
  };

  Drupal.behaviors.MediaLibraryWidgetDisableButton = {
    attach: function attach(context) {
      $('.js-media-library-open-button[data-disabled-focus="true"]', context).once('media-library-disable').each(function () {
        var _this = this;

        $(this).focus();

        setTimeout(function () {
          $(_this).attr('disabled', 'disabled');
        }, 50);
      });
    }
  };
})(jQuery, Drupal, Sortable);
