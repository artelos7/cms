<?php defined( 'SYSPATH' ) or die( 'No direct access allowed.' );

/**
 * @package		KodiCMS/Hybrid
 * @category	API
 * @author		butschster <butschster@gmail.com>
 * @link		http://kodicms.ru
 * @copyright	(c) 2012-2014 butschster
 * @license		http://www.gnu.org/licenses/old-licenses/lgpl-2.1.txt
 */
class Controller_Api_Datasource_Hybrid_Document extends Controller_System_API
{
	public function get_find()
	{
		$query = $this->param('key', NULL);
		$ids = $this->param('ids', array());
		$doc_id = $this->param('id', NULL);
		$is_array = $this->param('is_array', FALSE);
		$ds_id = (int) $this->param('ds_id', NULL, TRUE);

		// @see Datasource_Section_Hybrid_Headline::search_by_keyword
		$this->request->query('search', $query);
		$ds = Datasource_Data_Manager::load($ds_id);
		$documents = $ds->headline()->get($ids);
		$response = array();

		if ($is_array === FALSE)
		{
			$response[] = array(
				'id' => 0,
				'text' => __('--- Not set ---')
			);
		}

		$ordered = array();

		if(!empty ($ids))
		{
			foreach ($ids as $i => $id)
			{
				if (array_key_exists($id, $documents['documents']))
				{
					$ordered[$id] = $documents['documents'][$id];
				}
			}
		}
		else
		{
			$ordered = $documents['documents'];
		}


		foreach ($ordered as $id => $data)
		{
			if ($doc_id != $id)
			{
				$response[] = array(
					'id' => $id,
					'text' => $data['header']
				);
			}
		}

		$this->response($response);
	}
}
