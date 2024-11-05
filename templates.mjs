export const phpPageTemplate = (templateName) =>
  `<? 
  // Template name: ${templateName}

  $fields = get_fields();
  $context = Timber::context();
  $context['post'] = new Timber\Post();
  $context['fields'] = get_fields();

  Timber::render('templates/pages/${templateName.toLowerCase()}.twig', $context);
`;

export const twigPageTemplate = () =>
  `{% extends "templates/base.twig" %}
{% block content %}




{% endblock %}
`;

export const phpBlockTemplate = (blockName, functionName) => {
  const blockNameLC = blockName.toLowerCase();
  let fnName = functionName ?? blockNameLC;

  return `
<?
add_action('acf/init', 'register_${blockName.toLowerCase()}');

function register_${fnName}()
{
    // Bail out if function doesn't exist.
    if (!function_exists('acf_register_block')) {
        return;
    }

    // Register a new block.
    acf_register_block(array(
        'name'            => '${blockName.toLowerCase()}',
        'title'           => __('${blockName}'),
        'description'     => __('${blockName}.'),
        'render_callback' => '${blockName.toLowerCase()}',
        'category'        => 'formatting',
        'icon'            => 'admin-comments',
        'keywords'        => array('${blockName.toLowerCase()} Block'),
    ));
}

function ${fnName}($block, $content = '', $is_preview = false)
{
    $context = Timber::context();
    // Store block values.
    $context['block'] = $block;
    // Store field values.
    $fields = get_fields();
    $context['fields'] = $fields;
    // Store $is_preview value.
    $context['is_preview'] = $is_preview;
    // Store post data
    $context['post'] = new TimberPost();


    // Render the block.
    Timber::render('templates/blocks/${blockName.toLowerCase()}.twig', $context);

}`;
};
