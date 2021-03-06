import TIPS from 'apps/user/data/tips.json';

export default (req, res, next) => {
  if (req.user && (req.user.get('slug') === req.params.id) && req.user.get('show_tour')) {
    const tips = TIPS.filter(tip => !req.cookies[tip.id]);

    res.locals.tips = tips;
    res.locals.sd.TIPS = tips;
  }

  return next();
};
